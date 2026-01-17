import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../services/api";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(true);

  // 1. Fetch existing data when page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNewsById(id);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setLoading(false);
      } catch (error) {
        alert("Error fetching news");
        navigate("/");
      }
    };
    fetchData();
  }, [id, navigate]);

  // 2. Handle Update Submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateNews(id, { title, content, category });
      alert("News Updated Successfully!");
      navigate(`/news/${id}`); // Go back to the detail page
    } catch (error) {
      console.error("Failed to update news", error);
      alert("Error: Could not update news.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>✏️ Edit Article</h2>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", fontSize: "1.1rem" }}
          required
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "10px" }}>
          <option value="General">General</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
        </select>

        <label>Content</label>
        <textarea
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: "10px", fontSize: "1rem" }}
          required
        />

        <button type="submit" style={{ padding: "12px", background: "#007BFF", color: "white", border: "none", cursor: "pointer", fontSize: "1rem", borderRadius: "5px" }}>
          Update News
        </button>
      </form>
    </div>
  );
};

export default EditNews;