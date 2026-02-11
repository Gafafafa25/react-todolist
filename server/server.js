const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());
app.use(express.static('public'));


const db = new sqlite3.Database('test.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to SQLite database.');
});

// create table
db.run(`
  CREATE TABLE IF NOT EXISTS todolist (
    id TEXT PRIMARY KEY,
    text TEXT,
    isDone BOOLEAN NOT NULL DEFAULT 0
  )
`);



// insert data
db.run(`INSERT INTO todolist (id, text) VALUES (?, ?)`, ['1770814467586', 'read']);
//
// // read data
// db.all(`SELECT * FROM users`, [], (err, rows) => {
//     if (err) {
//         throw err;
//     }
//     console.log(rows);
// });
//
// db.close();

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});