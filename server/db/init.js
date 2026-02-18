import path from 'path';
import {fileURLToPath} from 'url';
import db from './db.js';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrations = path.join(__dirname, 'migrations');

export function initDb() {
    return new Promise((resolve, reject) => {
        const files = fs.readdirSync(migrations).sort();
        console.log(files);
        db.serialize(() => {
            for (const file of files) {
                const filePath = path.join(migrations, file);
                const sql = fs.readFileSync(filePath, 'utf8');
                db.run(sql, (err) => {
                    if (err) {
                        console.error('Error sqlite3: ', err.message);
                        reject(err);
                        return
                    }
                })
            }
            console.log('Database Initialized successfully.');
            resolve();
        })
    })
}