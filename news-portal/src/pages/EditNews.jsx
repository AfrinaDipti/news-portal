
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../services/api";

function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    getNewsById(id).then(res => {
      setTitle(res.data.title);
      setBody(res.data.body);
    }).catch(() => navigate("/news"));
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (body.length < 20) return alert("Content too short");
    await updateNews(id, { title, body });
    navigate("/news");
  };

  return (
    <div className="centered-container">
      <div className="form-card">
        <h2>Edit Post</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea rows="5" value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-primary btn-block">Save</button>
            <button type="button" onClick={() => navigate("/news")} className="btn btn-secondary btn-block">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNews;