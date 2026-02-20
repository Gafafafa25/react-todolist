import pkg from 'pg';

const {Pool} = pkg;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER , //todo
    password: process.env.DB_PASSWORD, //todo
    database: process.env.DB_NAME //todo
});

pool.on("connect", () => console.log("Successfully connected to db"));
pool.on("connectionError", (err) => { console.error(err.message); });

export default pool;