import { sql } from 'drizzle-orm';
const query = sql<number>`SUM(CASE WHEN ${sql.raw('difficulty_level')} = 1 THEN 1 ELSE 0 END)`.mapWith(Number);
console.log(query);
