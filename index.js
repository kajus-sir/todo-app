const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json())

const db = new sqlite3.Database('./todo.db');

db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, completed BOOLEAN)');

// Route

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Route to fetch all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    res.json(rows);
  });
});



// Start the server - node index.js
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
