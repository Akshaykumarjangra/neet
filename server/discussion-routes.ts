import { Router, type Request, type Response } from "express";
import { db } from "./db";
import {
  discussions,
  discussionReplies,
  discussionVotes,
  users,
  chapterContent,
  contentTopics,
} from "@shared/schema";
import { eq, and, desc, asc, sql, or } from "drizzle-orm";
import { requireAuth, requireActiveSubscription } from "./auth";
import { z } from "zod";

const router = Router();

const createDiscussionSchema = z.object({
  title: z.string().min(1).max(300),
  content: z.string().min(1),
  chapterId: z.number().optional(),
  topicId: z.number().optional(),
});

const createReplySchema = z.object({
  content: z.string().min(1),
});

const voteSchema = z.object({
  voteType: z.enum(["up", "down"]),
});

router.get("/", async (req, res) => {
  try {
    const { chapterId, topicId, sortBy, resolved, search, limit = "20", offset = "0" } = req.query;
    const userId = req.session?.userId;
    let isPremiumViewer = false;
    if (userId) {
      const [user] = await db
        .select({ isPaidUser: users.isPaidUser })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
      isPremiumViewer = Boolean(user?.isPaidUser);
    }

    let orderBy: any = desc(discussions.createdAt);
    if (sortBy === "votes") {
      orderBy = sql`(
        SELECT COALESCE(SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE -1 END), 0)
        FROM discussion_votes 
        WHERE discussion_id = ${discussions.id}
      ) DESC`;
    } else if (sortBy === "unanswered") {
      orderBy = sql`(
        SELECT COUNT(*) FROM discussion_replies WHERE discussion_id = ${discussions.id}
      ) ASC, ${discussions.createdAt} DESC`;
    }

    const conditions: any[] = [];
    
    if (chapterId) {
      conditions.push(eq(discussions.chapterId, parseInt(chapterId as string)));
    }
    if (topicId) {
      conditions.push(eq(discussions.topicId, parseInt(topicId as string)));
    }
    if (resolved === "true") {
      conditions.push(eq(discussions.isResolved, true));
    } else if (resolved === "false") {
      conditions.push(eq(discussions.isResolved, false));
    }
    if (search) {
      const searchTerm = `%${search}%`;
      conditions.push(
        or(
          sql`${discussions.title} ILIKE ${searchTerm}`,
          sql`${discussions.content} ILIKE ${searchTerm}`
        )
      );
    }

    const discussionList = await db
      .select({
        id: discussions.id,
        title: discussions.title,
        content: discussions.content,
        isPinned: discussions.isPinned,
        isResolved: discussions.isResolved,
        viewCount: discussions.viewCount,
        createdAt: discussions.createdAt,
        updatedAt: discussions.updatedAt,
        chapterId: discussions.chapterId,
        topicId: discussions.topicId,
        userId: discussions.userId,
        author: {
          id: users.id,
          name: users.name,
          avatarUrl: users.avatarUrl,
        },
        voteCount: sql<number>`COALESCE((
          SELECT SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE -1 END)
          FROM discussion_votes 
          WHERE discussion_id = ${discussions.id}
        ), 0)::int`,
        replyCount: sql<number>`(
          SELECT COUNT(*)::int FROM discussion_replies WHERE discussion_id = ${discussions.id}
        )`,
        hasAcceptedAnswer: sql<boolean>`EXISTS(
          SELECT 1 FROM discussion_replies 
          WHERE discussion_id = ${discussions.id} AND is_accepted_answer = true
        )`,
      })
      .from(discussions)
      .innerJoin(users, eq(discussions.userId, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(discussions.isPinned), orderBy)
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string));

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(discussions)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    res.json({
      discussions: discussionList,
      total: totalCountResult[0]?.count || 0,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string),
      requiresPremium: !isPremiumViewer,
    });
  } catch (error: any) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", requireActiveSubscription(), async (req, res) => {
  try {
    const userId = req.session.userId!;
    const validatedData = createDiscussionSchema.parse(req.body);

    const insertData: any = {
      title: validatedData.title,
      content: validatedData.content,
      userId,
      chapterId: validatedData.chapterId || null,
      topicId: validatedData.topicId || null,
    };

    const [discussion] = await db
      .insert(discussions)
      .values(insertData)
      .returning();

    const [author] = await db
      .select({ id: users.id, name: users.name, avatarUrl: users.avatarUrl })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    res.status(201).json({
      ...discussion,
      author,
      voteCount: 0,
      replyCount: 0,
      hasAcceptedAnswer: false,
    });
  } catch (error: any) {
    console.error("Error creating discussion:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const discussionId = parseInt(req.params.id);
    const userId = req.session.userId;

    await db
      .update(discussions)
      .set({ viewCount: sql`${discussions.viewCount} + 1` } as any)
      .where(eq(discussions.id, discussionId));

    const [discussion] = await db
      .select({
        id: discussions.id,
        title: discussions.title,
        content: discussions.content,
        isPinned: discussions.isPinned,
        isResolved: discussions.isResolved,
        viewCount: discussions.viewCount,
        createdAt: discussions.createdAt,
        updatedAt: discussions.updatedAt,
        chapterId: discussions.chapterId,
        topicId: discussions.topicId,
        userId: discussions.userId,
        author: {
          id: users.id,
          name: users.name,
          avatarUrl: users.avatarUrl,
        },
        voteCount: sql<number>`COALESCE((
          SELECT SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE -1 END)
          FROM discussion_votes 
          WHERE discussion_id = ${discussions.id}
        ), 0)::int`,
      })
      .from(discussions)
      .innerJoin(users, eq(discussions.userId, users.id))
      .where(eq(discussions.id, discussionId))
      .limit(1);

    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    let userVote = null;
    if (userId) {
      const [vote] = await db
        .select({ voteType: discussionVotes.voteType })
        .from(discussionVotes)
        .where(
          and(
            eq(discussionVotes.userId, userId),
            eq(discussionVotes.discussionId, discussionId)
          )
        )
        .limit(1);
      userVote = vote?.voteType || null;
    }

    const replies = await db
      .select({
        id: discussionReplies.id,
        content: discussionReplies.content,
        isAcceptedAnswer: discussionReplies.isAcceptedAnswer,
        createdAt: discussionReplies.createdAt,
        updatedAt: discussionReplies.updatedAt,
        userId: discussionReplies.userId,
        author: {
          id: users.id,
          name: users.name,
          avatarUrl: users.avatarUrl,
        },
        voteCount: sql<number>`COALESCE((
          SELECT SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE -1 END)
          FROM discussion_votes 
          WHERE reply_id = ${discussionReplies.id}
        ), 0)::int`,
      })
      .from(discussionReplies)
      .innerJoin(users, eq(discussionReplies.userId, users.id))
      .where(eq(discussionReplies.discussionId, discussionId))
      .orderBy(desc(discussionReplies.isAcceptedAnswer), desc(sql`COALESCE((
        SELECT SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE -1 END)
        FROM discussion_votes 
        WHERE reply_id = ${discussionReplies.id}
      ), 0)`), asc(discussionReplies.createdAt));

    let repliesWithUserVotes = replies.map(r => ({ ...r, userVote: null as string | null }));
    if (userId && replies.length > 0) {
      const replyIds = replies.map(r => r.id);
      const userReplyVotes = await db
        .select({
          replyId: discussionVotes.replyId,
          voteType: discussionVotes.voteType,
        })
        .from(discussionVotes)
        .where(
          and(
            eq(discussionVotes.userId, userId),
            sql`${discussionVotes.replyId} = ANY(ARRAY[${sql.join(replyIds, sql`, `)}]::int[])`
          )
        );

      const voteMap = new Map(userReplyVotes.map(v => [v.replyId, v.voteType]));
      repliesWithUserVotes = replies.map(r => ({
        ...r,
        userVote: voteMap.get(r.id) || null,
      }));
    }

    let chapterInfo = null;
    if (discussion.chapterId) {
      const [chapter] = await db
        .select({
          id: chapterContent.id,
          chapterTitle: chapterContent.chapterTitle,
          subject: chapterContent.subject,
          classLevel: chapterContent.classLevel,
          chapterNumber: chapterContent.chapterNumber,
        })
        .from(chapterContent)
        .where(eq(chapterContent.id, discussion.chapterId))
        .limit(1);
      chapterInfo = chapter || null;
    }

    let topicInfo = null;
    if (discussion.topicId) {
      const [topic] = await db
        .select({
          id: contentTopics.id,
          topicName: contentTopics.topicName,
          subject: contentTopics.subject,
        })
        .from(contentTopics)
        .where(eq(contentTopics.id, discussion.topicId))
        .limit(1);
      topicInfo = topic || null;
    }

    res.json({
      ...discussion,
      userVote,
      replies: repliesWithUserVotes,
      chapter: chapterInfo,
      topic: topicInfo,
    });
  } catch (error: any) {
    console.error("Error fetching discussion:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/replies", requireActiveSubscription(), async (req, res) => {
  try {
    const userId = req.session.userId!;
    const discussionId = parseInt(req.params.id);

    const [existingDiscussion] = await db
      .select({ id: discussions.id })
      .from(discussions)
      .where(eq(discussions.id, discussionId))
      .limit(1);

    if (!existingDiscussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    const validatedData = createReplySchema.parse(req.body);

    const insertData: any = {
      content: validatedData.content,
      discussionId,
      userId,
    };

    const [reply] = await db
      .insert(discussionReplies)
      .values(insertData)
      .returning();

    await db
      .update(discussions)
      .set({ updatedAt: new Date() } as any)
      .where(eq(discussions.id, discussionId));

    const [author] = await db
      .select({ id: users.id, name: users.name, avatarUrl: users.avatarUrl })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    res.status(201).json({
      ...reply,
      author,
      voteCount: 0,
      userVote: null,
    });
  } catch (error: any) {
    console.error("Error creating reply:", error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/:id/vote", requireActiveSubscription(), async (req, res) => {
  try {
    const userId = req.session.userId!;
    const discussionId = parseInt(req.params.id);
    const { voteType } = voteSchema.parse(req.body);

    const [existingDiscussion] = await db
      .select({ id: discussions.id })
      .from(discussions)
      .where(eq(discussions.id, discussionId))
      .limit(1);

    if (!existingDiscussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    const [existingVote] = await db
      .select()
      .from(discussionVotes)
      .where(
        and(
          eq(discussionVotes.userId, userId),
          eq(discussionVotes.discussionId, discussionId)
        )
      )
      .limit(1);

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        await db
          .delete(discussionVotes)
          .where(eq(discussionVotes.id, existingVote.id));
        
        return res.json({ voteType: null, message: "Vote removed" });
      } else {
        await db
          .update(discussionVotes)
          .set({ voteType })
          .where(eq(discussionVotes.id, existingVote.id));
        
        return res.json({ voteType, message: "Vote updated" });
      }
    } else {
      const insertData: any = {
        userId,
        discussionId,
        voteType,
        replyId: null,
      };
      
      await db
        .insert(discussionVotes)
        .values(insertData);
      
      return res.json({ voteType, message: "Vote added" });
    }
  } catch (error: any) {
    console.error("Error voting on discussion:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/resolve", requireActiveSubscription(), async (req, res) => {
  try {
    const userId = req.session.userId!;
    const discussionId = parseInt(req.params.id);
    const { isResolved } = req.body;

    const [discussion] = await db
      .select({ userId: discussions.userId })
      .from(discussions)
      .where(eq(discussions.id, discussionId))
      .limit(1);

    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    if (discussion.userId !== userId) {
      return res.status(403).json({ error: "Only the author can resolve this discussion" });
    }

    await db
      .update(discussions)
      .set({ isResolved: isResolved ?? true, updatedAt: new Date() } as any)
      .where(eq(discussions.id, discussionId));

    res.json({ message: "Discussion updated", isResolved: isResolved ?? true });
  } catch (error: any) {
    console.error("Error resolving discussion:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

export const replyRoutes = Router();

replyRoutes.post("/:id/vote", requireActiveSubscription(), async (req, res) => {
  try {
    const userId = req.session.userId!;
    const replyId = parseInt(req.params.id);
    const { voteType } = voteSchema.parse(req.body);

    const [existingReply] = await db
      .select({ id: discussionReplies.id })
      .from(discussionReplies)
      .where(eq(discussionReplies.id, replyId))
      .limit(1);

    if (!existingReply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    const [existingVote] = await db
      .select()
      .from(discussionVotes)
      .where(
        and(
          eq(discussionVotes.userId, userId),
          eq(discussionVotes.replyId, replyId)
        )
      )
      .limit(1);

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        await db
          .delete(discussionVotes)
          .where(eq(discussionVotes.id, existingVote.id));
        
        return res.json({ voteType: null, message: "Vote removed" });
      } else {
        await db
          .update(discussionVotes)
          .set({ voteType })
          .where(eq(discussionVotes.id, existingVote.id));
        
        return res.json({ voteType, message: "Vote updated" });
      }
    } else {
      const insertData: any = {
        userId,
        replyId,
        voteType,
        discussionId: null,
      };
      
      await db
        .insert(discussionVotes)
        .values(insertData);
      
      return res.json({ voteType, message: "Vote added" });
    }
  } catch (error: any) {
    console.error("Error voting on reply:", error);
    res.status(500).json({ error: error.message });
  }
});

replyRoutes.put("/:id/accept", requireActiveSubscription(), async (req, res) => {
  try {
    const userId = req.session.userId!;
    const replyId = parseInt(req.params.id);

    const [reply] = await db
      .select({
        id: discussionReplies.id,
        discussionId: discussionReplies.discussionId,
        isAcceptedAnswer: discussionReplies.isAcceptedAnswer,
      })
      .from(discussionReplies)
      .where(eq(discussionReplies.id, replyId))
      .limit(1);

    if (!reply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    const [discussion] = await db
      .select({ userId: discussions.userId })
      .from(discussions)
      .where(eq(discussions.id, reply.discussionId))
      .limit(1);

    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    if (discussion.userId !== userId) {
      return res.status(403).json({ error: "Only the discussion author can accept answers" });
    }

    if (!reply.isAcceptedAnswer) {
      await db
        .update(discussionReplies)
        .set({ isAcceptedAnswer: false } as any)
        .where(eq(discussionReplies.discussionId, reply.discussionId));
    }

    const newStatus = !reply.isAcceptedAnswer;
    await db
      .update(discussionReplies)
      .set({ isAcceptedAnswer: newStatus, updatedAt: new Date() } as any)
      .where(eq(discussionReplies.id, replyId));

    await db
      .update(discussions)
      .set({ isResolved: newStatus, updatedAt: new Date() } as any)
      .where(eq(discussions.id, reply.discussionId));

    res.json({ 
      message: newStatus ? "Answer accepted" : "Answer unaccepted",
      isAcceptedAnswer: newStatus,
    });
  } catch (error: any) {
    console.error("Error accepting answer:", error);
    res.status(500).json({ error: error.message });
  }
});
