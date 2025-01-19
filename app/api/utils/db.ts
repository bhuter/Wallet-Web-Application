const { Client } = require("pg");

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: Number(process.env.PG_PORT) || 5432,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

client.connect();
export default client;