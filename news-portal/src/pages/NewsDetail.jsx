import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, deleteNews, addComment } from "../services/api";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Smart Permissions
  const isAdmin = user?.role === "admin";
  const isAuthor = user?.name && news?.author && user.name === news.author;
  const canEditOrDelete = isAdmin || isAuthor;

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const data = await getNewsById(id);
      setNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this news?")) {
      try {
        await deleteNews(id);
        navigate("/");
      } catch (error) {
        alert("Failed to delete.");
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to comment");
    await addComment(id, { user: user.name, text: commentText });
    setCommentText("");
    fetchDetail();
  };

  if (!news) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", border: "1px solid #eee", borderRadius: "10px" }}>
      <h1>{news.title}</h1>
      <p style={{ color: "#555" }}>
        <strong>Author:</strong> {news.author} | <strong>Category:</strong> {news.category}
      </p>
      <hr />
      <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>{news.content}</p>

      {/* --- ACTION BUTTONS (Edit & Delete) --- */}
      {canEditOrDelete && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate(`/news/edit/${id}`)}
            style={{ background: "#007BFF", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}
          >
            ✏️ Edit
          </button>

          <button
            onClick={handleDelete}
            style={{ background: "red", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}
          >
            🗑️ Delete
          </button>
        </div>
      )}

      {/* --- COMMENTS SECTION --- */}
      <div style={{ marginTop: "40px", borderTop: "1px solid #ddd", paddingTop: "20px" }}>
        <h3>💬 Comments ({news.comments?.length || 0})</h3>

        {user ? (
          <form onSubmit={handleComment} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." required style={{ flex: 1, padding: "10px" }} />
            <button type="submit" style={{ padding: "10px", background: "#333", color: "white", border: "none" }}>Post</button>
          </form>
        ) : <p>Please <a href="/login">login</a> to comment.</p>}

        {news.comments?.map((c, i) => (
          <div key={i} style={{ background: "#f9f9f9", padding: "10px", marginBottom: "10px" }}>
            <strong>{c.user}</strong>: {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;