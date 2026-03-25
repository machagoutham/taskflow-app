# 🚀 TaskFlow - Task Management App

A full-stack Task Management Web Application built using the MERN stack.  
It allows users to create, manage, and track tasks with authentication and analytics.

---

## 📌 Features

### 🔐 Authentication
- User Signup & Login
- JWT-based authentication
- Secure password hashing (bcrypt)

### ✅ Task Management
- Create, update, delete tasks
- Set status (Todo / In Progress / Done)
- Set priority (Low / Medium / High)
- Add due date

### 🔍 Filtering & Search
- Filter by status
- Filter by priority
- Search tasks by title

### 📊 Analytics Dashboard
- Total tasks
- Completed tasks
- Pending tasks
- Completion percentage

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation

### Frontend
- React.js (Vite)
- Axios
- Tailwind CSS

---

## 📁 Project Structure
taskflow-app/
│
├── Backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── server.ts
│ └── package.json
│
├── Frontend/
│ ├── src/
│ └── package.json


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/machagoutham/taskflow-app.git
cd taskflow-app

2️⃣ Backend Setup
cd Backend
npm install
npm run dev

3️⃣ Frontend Setup
cd Frontend
npm install
npm run dev

🔑 Environment Variables

Create .env file in Backend:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

🌐 Running URLs
Frontend → http://localhost:5173
Backend → http://localhost:5000

Screenshots

<img width="1916" height="1073" alt="Screenshot 2026-03-25 235910" src="https://github.com/user-attachments/assets/22106a7d-5dfe-4668-945c-e2d20aa894dd" />

<img width="1919" height="1079" alt="Screenshot 2026-03-26 000039" src="https://github.com/user-attachments/assets/74d3f846-73ca-4ec5-9c63-a433396fe331" />


<img width="1919" height="1079" alt="Screenshot 2026-03-26 000039" src="https://github.com/user-attachments/assets/5e5007bb-228d-43a4-8beb-e076944b6c2e" />

<img width="1919" height="1079" alt="Screenshot 2026-03-26 000130" src="https://github.com/user-attachments/assets/334813bd-a648-4eea-a598-f1b41d3c9614" />

<img width="1919" height="1079" alt="Screenshot 2026-03-26 000125" src="https://github.com/user-attachments/assets/a7630b03-2881-4ee3-ab71-7804428a0e7d" />

