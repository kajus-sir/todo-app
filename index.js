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
    res.render('index', { tasks: rows });
  });
});

// Lägga in tasks i databas
app.post('/tasks', (req, res) => {
  const title = req.body.title;
  db.run('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, 0]);
  res.redirect('/');
});

// Route till att få alla tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    res.json(rows);
  });
});

// Visa edit formuläret
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    res.render('edit', { task });
  });
});

// Updatera tasksen
app.post('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const completed = req.body.completed ? 1 : 0;

  db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, id]);
  res.redirect('/');
});

// Ta bort Task
app.post('/tasks/:id/delete', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [id]);
  res.redirect('/');
});








// Start the server - node index.js
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
