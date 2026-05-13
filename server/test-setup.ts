import { Pool } from "pg";

// Mock pg Pool connect so it doesn't try to connect
Pool.prototype.connect = async function() {
  return {
    query: async () => {},
    release: () => {}
  } as any;
};

// Also mock setTimeout so testConnection retry doesn't loop
const originalSetTimeout = global.setTimeout;
global.setTimeout = ((fn: any, ms: any) => {
  if (ms && ms > 1000) {
    return { unref: () => {} };
  }
  return originalSetTimeout(fn, ms);
}) as any;
