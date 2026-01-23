// telemetry.ts – simple client-side telemetry wrapper

/**
 * Sends a telemetry event to the server.
 * In this implementation we simply POST to `/api/telemetry`.
 * The server can log or store the events as needed.
 */
export async function trackEvent(eventName: string, payload?: Record<string, any>) {
    try {
        await fetch('/api/telemetry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ event: eventName, data: payload ?? {} }),
            credentials: 'include', // include auth cookies if any
        });
    } catch (err) {
        // Fail silently – telemetry should not break user experience
        console.error('Telemetry error:', err);
    }
}
