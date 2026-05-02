require("dotenv/config");
const { Client } = require("pg");
const tables = process.argv.slice(2);
(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
  await client.connect();
  const res = await client.query(
    "select table_name, column_name, data_type, udt_name, is_nullable, column_default from information_schema.columns where table_schema = 'public' order by table_name, ordinal_position;"
  );
  await client.end();
  const rows = res.rows;
  const grouped = {};
  for (const row of rows) {
    if (tables.length && !tables.includes(row.table_name)) continue;
    if (!grouped[row.table_name]) grouped[row.table_name] = [];
    grouped[row.table_name].push(row);
  }
  console.log(JSON.stringify(grouped, null, 2));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
