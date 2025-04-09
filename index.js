const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./todo.db');


db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT, completed BOOLEAN)');

app.get('/', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      return res.status(500).send('Database error!');
    }
    res.render('index', { tasks: rows });
  });
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  // Insert new task into the database
  db.run('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, false], function(err) {
    if (err) {
      return res.status(500).send('Failed to add task');
    }
    res.redirect('/'); // Redirect back to the main page to show the updated list
  });
});

// Route to get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    res.json(rows);
  });
});






// Start the server - node index.js
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
