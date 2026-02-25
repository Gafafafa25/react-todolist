import pkg from 'pg';

const {Pool} = pkg;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_NAME || 'reactTodolist'
});

pool.on("connect", () => console.log("Successfully connected to db"));
pool.on("connectionError", (err) => { console.error(err.message); });

export default pool;