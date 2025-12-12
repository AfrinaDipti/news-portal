
import { useState } from "react";
import { createNews } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateNews() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || body.length < 20) return alert("Check inputs");
    
    const user = JSON.parse(localStorage.getItem("user"));
    await createNews({ 
      title, body, author_id: user.id, comments: [] 
    });
    navigate("/news");
  };

  return (
    <div className="centered-container">
      <div className="form-card">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Headline..." />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea rows="5" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Minimum 20 characters..." />
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