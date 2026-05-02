/**
 * Structured logging system using pino-compatible format.
 * Provides JSON structured logs in production, pretty-printed in dev.
 * Phase 0.4 — Observability
 */

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogContext {
  [key: string]: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 
  (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

const isProduction = process.env.NODE_ENV === 'production';

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatLog(level: LogLevel, msg: string, context?: LogContext): string {
  const entry = {
    level,
    time: new Date().toISOString(),
    msg,
    pid: process.pid,
    hostname: process.env.HOSTNAME || 'local',
    ...context,
  };

  if (isProduction) {
    return JSON.stringify(entry);
  }

  // Pretty-print in development
  const colorMap: Record<LogLevel, string> = {
    trace: '\x1b[90m',   // gray
    debug: '\x1b[36m',   // cyan
    info: '\x1b[32m',    // green
    warn: '\x1b[33m',    // yellow
    error: '\x1b[31m',   // red
    fatal: '\x1b[35m',   // magenta
  };
  const reset = '\x1b[0m';
  const color = colorMap[level];
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `${color}[${level.toUpperCase()}]${reset} ${entry.time} ${msg}${contextStr}`;
}

function createLogger(defaultContext?: LogContext) {
  const log = (level: LogLevel, msg: string, context?: LogContext) => {
    if (!shouldLog(level)) return;
    const merged = { ...defaultContext, ...context };
    const output = formatLog(level, msg, Object.keys(merged).length > 0 ? merged : undefined);
    
    if (level === 'error' || level === 'fatal') {
      console.error(output);
    } else if (level === 'warn') {
      console.warn(output);
    } else {
      console.log(output);
    }
  };

  return {
    trace: (msg: string, ctx?: LogContext) => log('trace', msg, ctx),
    debug: (msg: string, ctx?: LogContext) => log('debug', msg, ctx),
    info: (msg: string, ctx?: LogContext) => log('info', msg, ctx),
    warn: (msg: string, ctx?: LogContext) => log('warn', msg, ctx),
    error: (msg: string, ctx?: LogContext) => log('error', msg, ctx),
    fatal: (msg: string, ctx?: LogContext) => log('fatal', msg, ctx),
    child: (childContext: LogContext) => createLogger({ ...defaultContext, ...childContext }),
  };
}

export const logger = createLogger();
export type Logger = ReturnType<typeof createLogger>;
export { createLogger };
