// src/pages/CreateNews.jsx
import { useState } from "react";
import { createNews } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateNews() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  // 1. ADD THIS: Retrieve the user from storage when the component loads
  // We can just read it directly inside the submit handler, or store it in state.
  // Reading it in submit is easiest.

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. GET USER HERE
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;

    if (!currentUser) {
      alert("You must be logged in!");
      navigate("/");
      return;
    }

    if (!title.trim() || body.length < 20) return alert("Check inputs (Body must be 20+ chars)");

    const newPost = {
      // id: Date.now(), // REMOVED: Let MongoDB handle the ID
      title: title,
      body: body,
      author_id: currentUser.id, // Now 'currentUser' is defined!
      comments: []
    };

    try {
      await createNews(newPost);
      navigate("/news");
    } catch (error) {
      console.error("Failed to create news:", error);
      alert("Error creating news");
    }
  };

  return (
    <div className="centered-container">
      <div className="form-card">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Headline..."
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              rows="5"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Minimum 20 characters..."
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-primary btn-block">Publish</button>
            <button type="button" onClick={() => navigate("/news")} className="btn btn-secondary btn-block">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNews;