
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, getUsers, updateNews } from "../services/api";

function NewsDetail() {
  const navigate = useNavigate();

  const [newsItem, setNewsItem] = useState(null);
  const [users, setUsers] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
   
    const userStr = localStorage.getItem("user");
    if (userStr) setCurrentUser(JSON.parse(userStr));

    const fetchData = async () => {
      try {
        const newsRes = await getNewsById(id);
        const usersRes = await getUsers();
        setNewsItem(newsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error loading details:", error);
      }
    };
    fetchData();
  }, [id]);

  const getUserName = (userId) => {
    const u = users.find((user) => String(user.id) === String(userId));
    return u ? u.name : "Unknown User";
  };

  const handleAddComment = async () => {
    if (!currentUser) return alert("Please log in to comment");
    if (!commentText.trim()) return alert("Comment cannot be empty"); 

    const newComment = {
      id: Date.now(),
      text: commentText,
      user_id: currentUser.id, 
      timestamp: new Date().toISOString() 
    };

    const existingComments = newsItem.comments || [];
    const updatedComments = [...existingComments, newComment]; 

    try {

      await updateNews(id, { comments: updatedComments });
     
      setNewsItem({ ...newsItem, comments: updatedComments });
      setCommentText(""); 
    } catch (error) {
      alert("Failed to save comment");
    }
  };

  if (!newsItem) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate("/news")}>← Back to News</button>
      
      {/* NEWS CONTENT */}
      <h1 style={{ marginBottom: "10px" }}>{newsItem.title}</h1>
      <p style={{ color: "gray" }}>
        Written by: <strong>{getUserName(newsItem.author_id)}</strong>
      </p>
      <div style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px", margin: "20px 0", lineHeight: "1.6" }}>
        {newsItem.body}
      </div>

      <hr />

      {/* COMMENTS SECTION */}
      <h3>Comments ({newsItem.comments ? newsItem.comments.length : 0})</h3>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {(newsItem.comments || []).map((c) => (
          <li key={c.id} style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
            <strong>{getUserName(c.user_id)}</strong> 
            <span style={{ fontSize: "12px", color: "gray", marginLeft: "10px" }}>
              {new Date(c.timestamp).toLocaleString()}
            </span>
            <p style={{ marginTop: "5px" }}>{c.text}</p>
          </li>
        ))}
      </ul>

      {/* ADD COMMENT FORM  */}
      <div style={{ marginTop: "30px" }}>
        <h4>Leave a Comment</h4>
        {currentUser ? (
          <>
            <textarea
              rows="3"
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your opinion here..."
            />
            <button 
              onClick={handleAddComment}
              style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer" }}
            >
              Submit Comment
            </button>
          </>
        ) : (
          <p>Please log in to comment.</p>
        )}
      </div>
    </div>
  );
}

export default NewsDetail;