import express from 'express';
import {initDb} from "./db/init.js";

const app = express();
app.use(express.json());
// app.use(express.static('public'));

initDb().then(() => {
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    });
})