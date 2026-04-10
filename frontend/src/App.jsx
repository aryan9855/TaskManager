import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Loader2, Edit3, X, Check, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      setSubmitting(true);
      const response = await axios.post('/api/tasks', { title: newTaskTitle });
      setTasks([response.data, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      setError('Failed to add task.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`, { completed: !currentStatus });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return cancelEditing();
    try {
      const response = await axios.patch(`/api/tasks/${id}`, { title: editTitle });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setEditingId(null);
    } catch (err) {
      setError('Failed to update title.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="app-container">
      <header>
        <h1>Tasks Manager</h1>
        <div className="header-meta">
          <p className="subtitle">{activeCount} left to do</p>
          <div className="filter-tabs">
            {['all', 'active', 'completed'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <AlertCircle size={18} />
          {error}
          <button onClick={() => setError(null)} className="close-error"><X size={14} /></button>
        </div>
      )}

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="New task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          disabled={loading || submitting}
        />
        <button type="submit" className="add-btn" disabled={submitting || !newTaskTitle.trim()}>
          {submitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
        </button>
      </form>

      {loading ? (
        <div className="loading-spinner">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <div className="task-list">
          <AnimatePresence mode='popLayout'>
            {filteredTasks.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="empty-state">
                <div className="empty-icon">
                  <ClipboardList size={48} />
                </div>
                <div className="empty-text">No tasks to do, add a task!</div>
              </motion.div>
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`task-item ${editingId === task.id ? 'editing' : ''}`}
                >
                  <div className="checkbox-container" onClick={() => toggleComplete(task.id, task.completed)}>
                    {task.completed ? <CheckCircle2 size={24} color="#10b981" /> : <Circle size={24} color="#cbd5e1" />}
                  </div>

                  {editingId === task.id ? (
                    <div className="edit-container">
                      <input 
                        autoFocus
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => saveEdit(task.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(task.id);
                          if (e.key === 'Escape') cancelEditing();
                        }}
                      />
                      <div className="edit-actions">
                        <button onClick={() => saveEdit(task.id)} className="save-btn"><Check size={16} /></button>
                        <button onClick={cancelEditing} className="cancel-btn"><X size={16} /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="task-info">
                        <span 
                          className={`task-title ${task.completed ? 'completed' : ''}`}
                          onDoubleClick={() => startEditing(task)}
                        >
                          {task.title}
                        </span>
                        <span className="task-time">{formatDate(task.createdAt)}</span>
                      </div>
                      <div className="item-actions">
                        <button className="action-btn" onClick={() => startEditing(task)} title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button className="action-btn delete" onClick={() => deleteTask(task.id)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default App;
