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

router.post('/add', (req, res) => {
    const {id, text} = req.body;
    db.run('INSERT INT0 todolist (id, text) VALUES (?, ?)', [String(id), text], err => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({
                error: err.message
            })
        }
        res.status(201).json({
            id: String(id),
            text: text,
            isDone: false
        })
    })
})

router.put('/update', (req, res) => {
    const {id} = req.body;
    db.run('UPDATE todolist SET isDone = true WHERE id = (?)', [id], err => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({
                error: err.message
            })
        }
    });
})

export default router;