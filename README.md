<h1 align="center">📝 TaskManager</h1>

<p align="center">
  A Premium Full-Stack Task Management Application (MERN Style)
</p>

<p align="center">
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=for-the-badge" />
  </a>
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/Backend-API-blue?style=for-the-badge" />
  </a>
</p>

---

## 🚀 Overview

TaskManager is a sleek, production-ready task management platform designed for productivity. It features a premium glassmorphic interface and a robust backend with file-based persistence. Users can:

- ✅ Create and manage daily tasks
- 🕒 Track task creation time with automatic timestamps
- 🔍 Filter tasks by status (All, Active, Completed)
- ✏️ Edit tasks inline with double-click functionality
- 🗑️ Delete tasks with smooth exit animations
- 📱 Experience a fully responsive, mobile-first design

---

## 🧠 Tech Stack

### 🖥 Frontend
- React.js (Vite)
- Framer Motion (Animations)
- Lucide React (Icons)
- Vanilla CSS (Glassmorphic Design)
- Axios (API Calls)

### ⚙ Backend
- Node.js
- Express.js
- File-based Persistence (JSON)
- REST APIs
- CORS & UUID

---

## 🏗 System Architecture
Frontend (React + Vite)
→
REST API (Express.js)
→
JSON File Storage (Local Database)
→
Framer Motion (UI Feedback)

---

## 🔐 Key Features

✔ **Premium UI**: Ultra-modern glassmorphic design and smooth transitions.  
✔ **Smart Timestamps**: Automatic tracking of when each task was created.  
✔ **Inline Editing**: Double-click to rename tasks without leaving the view.  
✔ **Data Persistence**: Tasks are saved to a local JSON file to ensure data isn't lost.  
✔ **Real-time Stats**: Live counter for pending tasks.  
✔ **Advanced Filtering**: Quickly toggle between Active and Completed tasks.  

---

## 🌍 Live Deployment

🔗 Frontend:  
*(Add your Vercel/Netlify link here)*

🔗 Backend:  
*(Add your Railway/Render link here)*

---

## ⚙️ Local Setup

### Clone Repository
```bash
git clone https://github.com/aryan9855/TaskManager.git
```

### Install & Run
```bash
# Install root dependencies (concurrently)
npm install

# Install sub-directory dependencies
cd backend && npm install
cd ../frontend && npm install

# Start both servers together
cd ..
npm run dev
```

---

## 👨‍💻 Developer

**Aryan Singhal**  
*Full-Stack MERN Developer*  
Passionate about building scalable and beautiful web applications 🚀

---

## 📸 Screenshots

### 🏠 Home Page
<p align="center">
  <img src="src/screenshots/HomePage.png" width="800" />
</p>

### 🕒 Active Tasks
<p align="center">
  <img src="src/screenshots/Todo.png" width="800" />
</p>

### 🔍 Completed Tasks
<p align="center">
  <img src="src/screenshots/Completed.png" width="800" />
</p>