import {initDb} from "./init.js";

initDb()
    .then(() => {
        console.log("db initialized");
        process.exit(0);
    }).catch((e) => {
    console.error(e);
    process.exit(1);
})