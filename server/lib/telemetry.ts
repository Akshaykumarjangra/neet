/**
 * Server-side telemetry & Web Vitals collection endpoint.
 * Phase 0.4 — Observability
 * 
 * Collects:
 * - Client error reports
 * - Web Vitals (LCP, FID, CLS, TTFB, INP)
 * - Custom event tracking
 */

import { Router } from 'express';
import { logger } from './logger';

const telemetryLogger = logger.child({ module: 'telemetry' });

interface WebVitalEvent {
  name: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  navigationType?: string;
  url?: string;
}

interface ClientErrorEvent {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
}

interface CustomEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

const router = Router();

// Collect Web Vitals
router.post('/vitals', (req, res) => {
  try {
    const vitals: WebVitalEvent[] = Array.isArray(req.body) ? req.body : [req.body];
    
    for (const vital of vitals) {
      telemetryLogger.info('web_vital', {
        metric: vital.name,
        value: vital.value,
        rating: vital.rating,
        url: vital.url,
        navigationType: vital.navigationType,
        userId: (req as any).session?.passport?.user,
      });
    }
    
    res.status(204).end();
  } catch (error) {
    telemetryLogger.error('Failed to process web vitals', { error });
    res.status(400).json({ error: 'Invalid vitals data' });
  }
});

// Collect client errors
router.post('/errors', (req, res) => {
  try {
    const errorEvent: ClientErrorEvent = req.body;
    
    telemetryLogger.error('client_error', {
      message: errorEvent.message,
      stack: errorEvent.stack?.substring(0, 2000),
      componentStack: errorEvent.componentStack?.substring(0, 1000),
      url: errorEvent.url,
      userAgent: errorEvent.userAgent,
      userId: (req as any).session?.passport?.user,
      timestamp: errorEvent.timestamp,
    });
    
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Invalid error data' });
  }
});

// Collect custom events (for analytics)
router.post('/events', (req, res) => {
  try {
    const events: CustomEvent[] = Array.isArray(req.body) ? req.body : [req.body];
    
    for (const event of events) {
      telemetryLogger.info('custom_event', {
        event: event.name,
        properties: event.properties,
        userId: (req as any).session?.passport?.user,
        timestamp: event.timestamp || new Date().toISOString(),
      });
    }
    
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Invalid event data' });
  }
});

export default router;
