require("dotenv/config");
const { Client } = require("pg");
(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
  await client.connect();
  const res = await client.query(
    "select table_name, column_name, udt_name from information_schema.columns where table_schema = 'public' and data_type = 'USER-DEFINED' order by table_name, column_name;"
  );
  await client.end();
  console.log(res.rows);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
