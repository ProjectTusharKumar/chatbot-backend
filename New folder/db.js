const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chatbot.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer TEXT)`);
});

module.exports = db;
