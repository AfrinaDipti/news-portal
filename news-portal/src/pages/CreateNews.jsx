import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNews } from "../services/api";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const navigate = useNavigate();

  // 1. Security Check: Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You must be logged in to create news!");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get user email from storage to auto-fill author
      const user = JSON.parse(localStorage.getItem("user"));
      //const author = user ? user.email : "Anonymous";
      const author = user ? user.name : "Anonymous";

      await createNews({ title, content, category, author });
      alert("News Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create news", error);
      alert("Error: Could not save news.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>✍️ Write a New Article</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", fontSize: "1.1rem" }}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "10px" }}>
          <option value="General">General</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
        </select>
        <textarea
          rows="5"
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: "10px", fontSize: "1rem" }}
          required
        />
        <button type="submit" style={{ padding: "12px", background: "#007BFF", color: "white", border: "none", cursor: "pointer", fontSize: "1rem" }}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateNews;