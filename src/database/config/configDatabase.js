const sqlite3 = require("sqlite3");
const {open} = require("sqlite");

const openDB = async () => {
    const db = await open({
        filename: "src/database.db",
        driver: sqlite3.Database
    })

    return db;
};

module.exports = { openDB }