import { Pool } from 'pg';

// Mock pool.connect to avoid trying to actually connect
Pool.prototype.connect = async function() {
  return {
    query: async () => {},
    release: () => {}
  } as any;
};
