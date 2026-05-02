require("dotenv/config");
const { Client } = require("pg");
(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
  await client.connect();
  const res = await client.query("select column_name from information_schema.columns where table_name = 'users' and column_name in ('must_change_password','headline','avatar_url');");
  console.log(res.rows);
  await client.end();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
