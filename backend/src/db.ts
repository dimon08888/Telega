import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export default {
  query: function query<T extends any[]>(text: string, values?: T[]) {
    return pool.query(text, values);
  },
};
