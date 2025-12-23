# Simple News Portal (MERN Stack)

A full-stack React application for managing news articles. Originally built with a mock backend, this project has been upgraded to use **Express.js** and **MongoDB** for a real database and REST API implementation.

## 🚀 Features

* **Authentication:** Simulated login using seeded user profiles.
* **CRUD Operations:**
    * **Create:** Publish new news articles (saved to MongoDB).
    * **Read:** View news lists with pagination and detailed single views.
    * **Update:** Edit existing posts (real-time updates).
    * **Delete:** Remove posts permanently from the database.
* **Comments System:** Add comments to posts (stored in MongoDB).
* **Responsive Design:** Works on mobile and desktop.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Axios, React Router DOM
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Tools:** Nodemon, VS Code

---

## ⚙️ How to Run the Project

This project is now a **Full Stack App**. You need to run the **Backend** (Server) and **Frontend** (Client) separately.

### 1. Prerequisites
Before you start, make sure you have installed:
* **Node.js**: [Download Here](https://nodejs.org/)
* **MongoDB Community Server**: [Download Here](https://www.mongodb.com/try/download/community)

*(Ensure the MongoDB service is running on your computer).*

---

### 2. Backend Setup (Terminal 1)

The backend connects to MongoDB and handles all API requests.

1.  Open a terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npx nodemon server.js
    ```
    *Success Message:* `🚀 Express Server running on http://localhost:5000` & `✅ Connected to MongoDB`

4.  **Seed the Database (First Time Only):**
    Since the database starts empty, run this command **in a separate terminal** to add initial users (Alice & Karim):
    ```bash
    curl -X POST http://localhost:5000/seed
    ```
    *(Or simply open `http://localhost:5000/users` in your browser if curl fails).*

---

### 3. Frontend Setup (Terminal 2)

The frontend is the React user interface.

1.  Open a **new terminal** in the main project folder (root):
    ```bash
    # If you are inside 'backend', go back one step
    cd .. 
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm run dev
    ```
4.  Open the link shown (usually `http://localhost:5173`) in your browser.

---

## 🔑 Login Credentials

After seeding the database, you can use these profiles to log in:

* **Name:** Alice Rahman
* **Name:** Karim Hossain

---

## 📝 API Endpoints (Backend)

The Express server runs on port `5000` and provides these routes:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/users` | List all users |
| `GET` | `/news` | Get paginated news |
| `GET` | `/news/:id` | Get single news detail |
| `POST` | `/news` | Create a new post |
| `PATCH` | `/news/:id` | Update a post/comments |
| `DELETE` | `/news/:id` | Delete a post |
| `POST` | `/seed` | Reset DB and add default users |

---

## 📂 Project Structure