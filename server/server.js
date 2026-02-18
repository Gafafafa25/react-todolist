import express from 'express';
import {initDb} from "./db/init.js";
import todosRouter from "./routes/todos.js"

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/api', todosRouter)
// app.use(express.static('public'));

initDb().then(() => {
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    });
})