import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const DB_FILE = path.join(__dirname, 'tasks.json');

// Middleware
app.use(cors());
app.use(express.json());

// Load/Save tasks from file
const loadTasks = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      if (data.trim()) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading tasks (resetting):', err.message);
    try { fs.unlinkSync(DB_FILE); } catch(e) {}
  }
  return [];
};

const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error saving tasks:', err);
  }
};

let tasks = loadTasks();

// Routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

  if (typeof completed === 'boolean') tasks[taskIndex].completed = completed;
  if (typeof title === 'string' && title.trim()) tasks[taskIndex].title = title.trim();

  saveTasks(tasks);
  res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== req.params.id);
  if (tasks.length === initialLength) return res.status(404).json({ error: 'Task not found' });
  
  saveTasks(tasks);
  res.status(204).send();
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, '127.0.0.1', () => console.log(`Server running on port ${PORT}`));
