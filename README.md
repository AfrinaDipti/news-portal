# 📰 News Portal - JWT Authentication System

A full-stack News Portal application featuring **JWT Authentication**, **Role-Based Access Control (RBAC)**, and **Smart Permissions**. This project demonstrates how to secure a React frontend and Node.js backend using JSON Web Tokens.

---

## 🚀 Features

- **Authentication:** Secure User Login using JWT (JSON Web Tokens).
- **Role-Based Access:**
  - **Admins:** Can delete *any* news post.
  - **Users:** Can only delete *their own* news posts.
- **Smart UI:** Buttons (like "Delete" or "Create") only appear if the user has permission.
- **Comments System:** Logged-in users can comment on news articles.
- **Security:** Passwords are hashed using `bcryptjs`.
- **API Standard:** All backend routes follow RESTful standards under `/api`.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Security:** `jsonwebtoken` (JWT), `bcryptjs`, `cors`

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js installed.
- MongoDB installed and running locally (`127.0.0.1:27017`).

### 2. Backend Setup
Open a terminal in the `backend` folder:
```bash
cd backend
npm install
node server.js
```

The server will run on http://localhost:5000
3. Frontend Setup

Open a new terminal in the root folder (or news-portal folder):
Bash

npm install
npm run dev

The frontend will run on http://localhost:5173
🧪 How to Test (Credentials)

First, Seed the Database to create the default users. You can do this by sending a POST request to http://localhost:5000/api/seed or simply opening that URL in a browser if it was a GET request (but in this code, use Postman or curl).
Default Users:
Role	Email	Password	Permissions
Admin	alice@example.com	password123	Can delete ANY news.
User	karim@example.com	password123	Can delete ONLY their own news.
📡 API Documentation
Authentication
Method	Endpoint	Description
POST	/api/login	Login and receive a JWT Token.
POST	/api/seed	Reset database and create default users.
News
Method	Endpoint	Protected?	Description
GET	/api/news	❌ No	Get all news.
GET	/api/news/:id	❌ No	Get single news details.
POST	/api/news	✅ Yes	Create a new news article.
DELETE	/api/news/:id	✅ Yes	Delete news (Smart Check: Admin or Author only).
PUT	/api/news/:id	✅ Yes	Update news content.
Comments
Method	Endpoint	Protected?	Description
POST	/api/news/:id/comments	✅ Yes	Add a comment to a news post.
🔒 Security & "Smart" Logic

This project implements "Smart Permissions" in both Frontend and Backend:

    Frontend (NewsDetail.jsx): The "Delete" button is hidden unless:

        You are the Admin.

        OR You are the Author of the post.

    Backend (server.js): Even if a hacker tries to bypass the UI using Postman, the backend verifies the token:
    JavaScript

    if (decoded.role === 'admin' || decoded.name === news.author) {
       // Allow Delete
    } else {
       // Return 403 Forbidden
    }

📂 Project Structure

| news-portal/
├── backend/
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── NewsList.jsx
│   │   ├── NewsDetail.jsx
│   │   └── CreateNews.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
