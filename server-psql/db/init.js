import path from 'path';
import {fileURLToPath} from 'url';
import db from './db.js';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrations = path.join(__dirname, 'migrations');

export async function initDb() {
    try {
        const files = fs.readdirSync(migrations).sort();
        console.log(files);
        for (const file of files) {
            const filePath = path.join(migrations, file);
            const sql = fs.readFileSync(filePath, 'utf8');
            await db.query(sql)
            console.log("+") //todo
        }
        console.log("Migrations finished")
    }
    catch (err) {
        console.error("Error psql: ", err.message);
    }
}