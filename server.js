const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// const db = new sqlite3.Database('todolist.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to SQLite database.');
// });

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});