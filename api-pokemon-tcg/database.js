const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cartas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL,
      raridade TEXT NOT NULL,
      hp INTEGER,
      precoMercado REAL,
      dataLancamento TEXT,
      foto TEXT,
      latitude REAL,
      longitude REAL
    )
  `);
});

module.exports = db;
