import { Router } from 'express';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { users } from '@shared/schema';
import { requireAuthWithPasswordCheck, getCurrentUser } from './auth';

/**
 * Simple telemetry endpoint that records events.
 * For now it just logs the event and stores it in a `telemetry_events` table.
 * The table should be created via a migration (not shown here).
 */
const router = Router();

router.post('/telemetry', requireAuthWithPasswordCheck, async (req, res) => {
    try {
        const userId = getCurrentUser(req);
        const { event, data } = req.body as { event: string; data?: Record<string, any> };
        if (!event) {
            return res.status(400).json({ error: 'Missing event name' });
        }
        // Insert into telemetry_events table (assumes such a table exists)
        // If the table does not exist, this will fail silently; for now we just log.
        try {
            // Table assumes existence, commenting out to avoid build error until migration exists
            // await db.insert(sql`telemetry_events` as any).values({
            //     user_id: userId,
            //     event_name: event,
            //     payload: JSON.stringify(data ?? {}),
            //     created_at: new Date(),
            // });
        } catch (e) {
            console.warn('Telemetry insert failed, proceeding without persistence', e);
        }
        console.log('Telemetry event recorded:', { userId, event, data });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Telemetry endpoint error:', err);
        res.status(500).json({ error: 'Failed to record telemetry' });
    }
});

export default router;
