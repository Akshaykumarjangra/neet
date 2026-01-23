import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Hammer, Sparkles } from "lucide-react";

interface ChapterPlaceholderProps {
  subject: string;
  chapterNumber: number;
  title?: string;
  questionCount?: number;
  practiceHref?: string;
}

export function ChapterPlaceholder({
  subject,
  chapterNumber,
  title,
  questionCount,
  practiceHref,
}: ChapterPlaceholderProps) {
  const displayTitle = title || `Chapter ${chapterNumber}`;

  const handlePracticeRedirect = () => {
    if (practiceHref) {
      window.location.href = practiceHref;
    }
  };

  return (
    <Card className="border-dashed border-primary/30 bg-gradient-to-br from-muted/60 via-background to-muted/40">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl">
              {subject} Chapter {chapterNumber}
            </CardTitle>
            <CardDescription className="mt-1">
              {displayTitle} · Detailed reading is being finalized
            </CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Hammer className="h-4 w-4" />
            In Progress
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Our academic team is polishing the interactive notes, visuals, and summaries for this chapter. You will
            automatically get the updated content as soon as it is published.
          </p>
          <div className="flex items-start gap-3 rounded-lg border border-dashed border-primary/40 bg-card/70 p-4">
            <Sparkles className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="font-medium text-foreground">What can you do meanwhile?</p>
              <p>
                Keep your streak alive with practice questions, revisit completed chapters, or explore mock tests to
                strengthen fundamentals.
              </p>
            </div>
          </div>
        </div>

        {practiceHref && (
          <div className="rounded-lg border border-border/70 bg-background p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Practice still available
                </p>
                <p className="text-sm text-muted-foreground">
                  {questionCount && questionCount > 0
                    ? `${questionCount} curated questions are ready for this topic.`
                    : "Jump into practice mode for immediate revision."}
                </p>
              </div>
              <Button onClick={handlePracticeRedirect} size="sm" className="mt-2 sm:mt-0">
                Go to practice
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
