# 🚀 TaskFlow - Task Management System

A full-stack **Task Tracker Web Application** built with React + Node.js + MongoDB.  
Users can create, manage tasks, track progress, and gain insights through analytics.

---

## 🎯 Objective

Built as per the assignment: A **Task Management System** with authentication, task CRUD operations, filtering, search, and analytics dashboard.

---

## ✨ Features Implemented

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication with secure token handling
- Password hashing using bcrypt
- Protected routes

### ✅ Task Management
- Create, Read, Update, Delete tasks
- Mark tasks as **Todo / In Progress / Done**
- Priority levels: **Low / Medium / High**
- Due Date support

### 🔍 Filtering & Search
- Filter by Status
- Filter by Priority
- Search by Title
- Pagination support

### 📊 Analytics Dashboard (NEW - Important)
- Total number of tasks
- Number of completed tasks
- Number of pending tasks
- Completion percentage
- **Visual Charts**:
  - Bar chart: Tasks by Status
  - Pie chart: Priority Distribution

### 🎨 UI/UX
- Clean, modern, responsive design
- Dark mode toggle
- Modal forms for create/update tasks
- Loading states and error handling
- Toast-like feedback

---

## 🛠️ Tech Stack

### Frontend:
- React (Vite + TypeScript)
- Tailwind CSS
- Recharts (for analytics charts)
- Axios
- React Router

### Backend:
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- TypeScript

### Database:
- MongoDB (with indexes for performance)

---

## 📁 Project Structure

```
taskflow-app/
│
├── Backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
│
├── Frontend/                 # React + Vite frontend
│   ├── src/
│   └── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/machagoutham/taskflow-app.git
cd taskflow-app
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRES_IN=7d
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

---

### 4. Access the App

- Frontend: http://localhost:5173  
- Backend: http://localhost:5000  

> Note: Create a free MongoDB Atlas cluster and replace `MONGO_URI`.

---

## 🔗 API Endpoints

### Auth Routes

| Method | Endpoint             | Description        | Protected |
|--------|---------------------|--------------------|----------|
| POST   | /api/auth/register  | User registration  | No       |
| POST   | /api/auth/login     | User login         | No       |

---

### Task Routes (Protected)

| Method | Endpoint              | Description                    |
|--------|----------------------|--------------------------------|
| GET    | /api/tasks           | Get tasks (with filters)       |
| POST   | /api/tasks           | Create new task                |
| GET    | /api/tasks/:id       | Get single task                |
| PUT    | /api/tasks/:id       | Update task                    |
| DELETE | /api/tasks/:id       | Delete task                    |
| GET    | /api/tasks/analytics | Get analytics + charts data    |

---

## 🏗️ Design Decisions

- TypeScript everywhere for better type safety and maintainability  
- Zod for runtime validation on backend  
- Context API for simple state management (Auth)  
- Recharts for clean, responsive analytics charts  
- Tailwind CSS for fast, consistent UI + dark mode  
- Mongoose indexes on frequently queried fields (user, status, priority)  
- Separate frontend and backend folders for clear architecture  

---

## 📸 Screenshots

### 🔐 Login / Register
![Login Page](https://github.com/user-attachments/assets/d394953b-a15c-4a18-a601-f0f77a1affbd)
![Register Page](https://github.com/user-attachments/assets/5a18b780-f2b3-4c83-808e-982aec8aeae5)

---

### 📊 Analytics Dashboard (Light Mode)
![Dashboard Overview](https://github.com/user-attachments/assets/f732f836-d76c-4dd1-a83b-715abd8303bc)
![Tasks View](https://github.com/user-attachments/assets/24496d52-5a90-407d-be81-92180ccd6b15)
![Filtered Tasks](https://github.com/user-attachments/assets/ae380b07-65a3-4d45-8be1-40de7c5e675a)

---

### 🌙 Dark Mode Dashboard
![Dark Mode Dashboard](https://github.com/user-attachments/assets/f101ca1e-4973-4e59-971a-9a8cd6277d23)

---

### 📋 Task List with Filters
![Task List](https://github.com/user-attachments/assets/ac739af6-b0aa-464d-b396-a494ff8ff6af)
![Filtered View](https://github.com/user-attachments/assets/39e49766-299b-4cc6-92f7-8562e5a614a7)
![Advanced Filters](https://github.com/user-attachments/assets/b0dcba73-521c-4201-b394-034a06708ce8)

---
### ➕ Create Task Modal
<img width="1919" height="1078" alt="Screenshot 2026-03-26 000113" src="https://github.com/user-attachments/assets/c5e3693a-7dfe-4e29-9138-2a0a63c4382c" />

<img width="1919" height="1079" alt="Screenshot 2026-03-26 212637" src="https://github.com/user-attachments/assets/72eaf710-7ef4-4bc7-a54a-eb96684b01f8" />
---

## 🚀 Highlights

- Fully responsive and modern UI with dark mode  
- Real-time analytics with beautiful charts  
- Proper error handling and validation  
- Production-ready code structure  
- Meets all core and enhancement requirements  

---

## 👨‍💻 Author

**Goutham M**  
GitHub: https://github.com/machagoutham

⭐ If you like this project, please give it a star!
