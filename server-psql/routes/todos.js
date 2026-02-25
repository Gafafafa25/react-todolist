import express from 'express';

const router = express.Router();
import pool from '../db/db.js';


router.get('/todos', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM todolist')
        const todos = data.rows.map(row => ({
            id: row.id,
            text: row.text,
            isDone: Boolean(row.isDone)
        }))
        res.json(todos)
    } catch (err) {
        res.status(500).send(err.message + 'Database error');
    }
})

router.post('/add', async (req, res) => {
    const {id, text} = req.body;
    try {
        const data = await pool.query('INSERT INTO todolist (id, text) VALUES ($1, $2)', [String(id), text])
        res.json(data.rows)
    } catch (err) {
        res.status(500).send(err.message + 'Database error');
    }
})

router.put('/update', async (req, res) => {
    const {id} = req.body;
    try {
        const data = await pool.query('UPDATE todolist SET isDone = true WHERE id = ($1)', [id])
        res.json(data.rows)
    } catch (err) {
        res.status(500).send(err.message + 'Database error');
    }
})

export default router;