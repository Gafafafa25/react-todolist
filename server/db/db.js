import sqlite3Lib from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite3 = sqlite3Lib.verbose();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'todolist.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error sqlite3: ", err.message);
    }
    else {
        console.log('Connected to SQLite database.');
    }
});

export default db;
