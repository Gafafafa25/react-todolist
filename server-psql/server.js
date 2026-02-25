import express from 'express';
import {initDb} from "./db/init.js";
// import todosRouter from "./routes/todos.js"
import "dotenv/config";
import pool from "./db/db.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// app.use('/api', todosRouter)
// app.use(express.static('public'));

app.get('/db-test', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT NOW() AS current_time');
        res.json({
            status: 'ok',
            currentTime: rows[0]?.current_time
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
});

initDb()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    });