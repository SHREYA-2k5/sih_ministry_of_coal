import pkg from 'pg';
const {Pool}=pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shiftdb',
  password: 'admin',
  port: 5432,
});

export default pool;
