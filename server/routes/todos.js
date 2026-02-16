import express from 'express';

const router = express.Router();
import db from '../db/db.js';


router.get('/todos', (req, res) => {
    db.all('SELECT * FROM todolist', [], (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({
                error: err.message
            });
        }
        const todos = rows.map(row => ({
            id: row.id,
            text: row.text,
            isDone: Boolean(row.isDone)
        }))
        res.json(todos)
    })
})