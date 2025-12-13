# Simple News Portal

A dynamic React application that allows users to view, create, edit, and delete news posts. It uses a mock backend (JSON-Server) to simulate a real database with REST API endpoints.

## 🚀 Features

* **Authentication:** Simulated login using existing user profiles.
* **CRUD Operations:**
    * **Create:** Publish new news articles.
    * **Read:** View a list of news and detailed single-post views.
    * **Update:** Edit existing posts (Author only) and add comments.
    * **Delete:** Remove posts (Author only).
* **Comments System:** Users can add comments to specific news items.
* **Pagination:** Browse news items across multiple pages.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **HTTP Client:** Axios
* **Routing:** React Router DOM
* **Backend:** JSON-Server (Mock REST API)
* **Database:** `db.json` file

---

## ⚙️ How to Run the Project

This project requires **two separate terminals** running simultaneously (one for the backend, one for the frontend).

1. Prerequisite
Make sure you have **Node.js** installed on your machine.

2. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install

3. Start the Backend (Terminal 1)
npx json-server --watch db.json --port 3000

4. Start the Frontend (Terminal 2)
npm run dev