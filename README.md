# 🚀 TaskFlow – Full Stack Task Management Application

A production-ready **Task Management Web App** built as part of a hiring assignment.
It enables users to manage tasks efficiently with authentication, filtering, and analytics.

---

## 🎯 Objective

Build a **Task Tracker Web Application** where users can:

* Create and manage tasks
* Track progress
* Gain insights from their tasks

---

## ✨ Key Features

### 🔐 Authentication & Security

* User Signup & Login
* JWT-based authentication
* Password hashing using bcrypt
* Protected routes

---

### ✅ Task Management

* Create, update, delete tasks
* Mark tasks as Todo / In Progress / Done
* Set priority (Low / Medium / High)
* Add due dates

---

### 🔍 Filtering & Search

* Filter tasks by **status**
* Filter tasks by **priority**
* Search tasks by **title**

---

### 📊 Analytics Dashboard

* Total number of tasks
* Completed tasks
* Pending tasks
* Completion percentage
* Visual insights (status & priority distribution)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Zod (Validation)

### Frontend

* React (Vite)
* Axios
* Tailwind CSS

---

## 📁 Project Structure

```
taskflow-app/
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.ts
│   └── package.json
│
├── Frontend/
│   ├── src/
│   └── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/machagoutham/taskflow-app.git
cd taskflow-app
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside **Backend**:

```env
PORT=5000
MONGO_URI=mongodb://machagoutham:Goutham1234@ac-3dewq11-shard-00-00.ttnbdam.mongodb.net:27017,ac-3dewq11-shard-00-01.ttnbdam.mongodb.net:27017,ac-3dewq11-shard-00-02.ttnbdam.mongodb.net:27017/taskdb?ssl=true&replicaSet=atlas-lemye6-shard-0&authSource=admin&retryWrites=true&w=majority
JWT_SECRET=mysecret123
JWT_EXPIRES_IN=7d
```

---

## 🌐 Running URLs

* Frontend → http://localhost:5173
* Backend → http://localhost:5000

---

## 📸 Screenshots

### 🔐 Authentication

![Login/Register](https://github.com/user-attachments/assets/22106a7d-5dfe-4668-945c-e2d20aa894dd)

---

### 📊 Dashboard & Analytics

![Filters](https://github.com/user-attachments/assets/5e5007bb-228d-43a4-8beb-e076944b6c2e)

---

### ➕ Create Task

![Create Task](https://github.com/user-attachments/assets/b6617fac-8122-4101-a02c-75b11e9b3f75)

---

![Dashboard](https://github.com/user-attachments/assets/cc5fa8e3-c27f-4e52-a9a5-110f1899e650)

## 🚀 Highlights (Why this project stands out)

* Clean modular backend architecture
* Scalable REST API design
* Strong validation using Zod
* Secure authentication flow
* Real-world dashboard analytics
* Pagination support
* Sorting (date / priority)
* Full end-to-end MERN implementation

---

## 👨‍💻 Author

**Goutham M**
🔗 GitHub: https://github.com/machagoutham
