import pkg from 'pg';
import {connectionString} from "pg/lib/defaults.js";

const {Pool} = pkg;
const connection = process.env.DATABASE_URL ?
    {
        connectionString: process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}
    }
    :
    {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'myuser',
        password: process.env.DB_PASSWORD || 'mypassword',
        database: process.env.DB_NAME || 'reactTodolist'
    }


const pool = new Pool(connection);

pool.on("connect", () => console.log("Successfully connected to db"));
pool.on("connectionError", (err) => {
    console.error(err.message);
});

export default pool;