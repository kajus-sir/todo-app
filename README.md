# todo-app

Start server - node index.js

Open Database in Sqlite3
 - sqlite3 todo.db
 - PRAGMA table_info(tasks);

Check Your Changes
    SELECT * FROM lists; - Shows list
 
Add a New Task
    INSERT INTO tasks (task_name, status) VALUES ('Buy groceries', 0);

Edit an Existing Task
    UPDATE tasks SET completed = 1 WHERE title = 'Göra läxor';

Remove a Task
    DELETE FROM tasks WHERE id = 4;

Ändringar till Repo
    git status
    git add .
    git commit -m "Din commit-meddelande här"
    git push origin main



