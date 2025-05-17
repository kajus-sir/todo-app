const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const db = new sqlite3.Database('./todo.db');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Skapa tasks-tabellen om den inte finns
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT,
    completed BOOLEAN,
    notes TEXT
  )
`);



// Routes

// Visa alla tasks
app.get('/', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    res.render('index', { tasks: rows });
  });
});

// Lägg till ny task
app.post('/tasks', (req, res) => {
  const title = req.body.title;
  db.run('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, 0]);
  res.redirect('/');
});

// Hämta alla tasks som JSON
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    res.json(rows);
  });
});

// Visa edit-formulär för en task
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    res.render('edit', { task });
  });
});

// Uppdatera en task
app.post('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const completed = req.body.completed ? 1 : 0;
  const notes = req.body.notes;

  db.run('UPDATE tasks SET title = ?, completed = ?, notes = ? WHERE id = ?', [title, completed, notes, id]);
  res.redirect('/');
});

// Ta bort en task
app.post('/tasks/:id/delete', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [id]);
  res.redirect('/');
});

// Starta servern
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});

