// src/pages/NewsDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews, getUsers } from "../services/api";

function NewsDetail() {
  const { id } = useParams(); // 'id' is a String (e.g., "658a4b...")
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load User
    const userStr = localStorage.getItem("user");
    if (userStr) setCurrentUser(JSON.parse(userStr));

    // Fetch News and Users
    const fetchData = async () => {
      try {
        // ✅ FIX: Direct ID usage (No parseInt/Number conversion)
        const newsRes = await getNewsById(id);
        const usersRes = await getUsers();
        setNewsItem(newsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error loading news:", error);
        alert("Could not load news. Check console.");
        navigate("/news");
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    // Create new comment object
    const newComment = {
      id: Date.now(), // Comments inside the array can still use simple Number IDs
      text: comment,
      user_id: currentUser.id,
      timestamp: new Date().toISOString()
    };

    // Add to existing comments
    const updatedComments = [...(newsItem.comments || []), newComment];

    // Update Backend
    // ✅ We send ONLY the fields we want to update
    await updateNews(id, { comments: updatedComments });

    // Update Screen
    setNewsItem({ ...newsItem, comments: updatedComments });
    setComment("");
  };

  const getAuthorName = (uid) => {
    // ✅ FIX: Convert both to String to match safely
    const u = users.find(user => String(user.id) === String(uid));
    return u ? u.name : "Unknown";
  };

  if (!newsItem) return <div className="centered-container">Loading...</div>;

  return (
    <div className="container">
      <div className="news-card" style={{ marginTop: "40px" }}>
        <h2>{newsItem.title}</h2>
        <p className="author-text">By {getAuthorName(newsItem.author_id)}</p>
        <p className="news-body">{newsItem.body}</p>

        <hr />

        {/* COMMENTS SECTION */}
        <h3>Comments</h3>
        <div style={{ marginBottom: "20px" }}>
          {newsItem.comments?.map((c) => (
            <div key={c.id} style={{ background: "#f9f9f9", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
              <strong>{getAuthorName(c.user_id)}</strong>: {c.text}
            </div>
          ))}
        </div>

        {currentUser && (
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment} className="btn btn-primary" style={{ width: "auto" }}>Post</button>
          </div>
        )}

        <button onClick={() => navigate("/news")} className="btn btn-secondary" style={{ marginTop: "20px" }}>
          Back to List
        </button>
      </div>
    </div>
  );
}

export default NewsDetail;