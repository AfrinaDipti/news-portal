import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNews } from "../services/api";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const isLoggedIn = !!localStorage.getItem("token"); // Check if logged in

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>🔥 Latest News</h2>
        {/* Only show this button if user is logged in */}
        {isLoggedIn && (
          <Link to="/create" style={styles.createBtn}>
            + Create News
          </Link>
        )}
      </div>

      {news.length === 0 ? <p>No news found.</p> : null}

      <div style={{ display: "grid", gap: "20px" }}>
        {news.map((item) => (
          <div key={item._id} style={styles.card}>
            <h3>{item.title}</h3>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>By {item.author || "Unknown"} | {new Date(item.timestamp).toLocaleDateString()}</p>
            {/* <p>{item.content.substring(0, 100)}...</p> */}
            <Link to={`/news/${item._id}`} style={styles.readMore}>Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  createBtn: { background: "#28a745", color: "white", padding: "10px 15px", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" },
  card: { padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" },
  readMore: { color: "#007BFF", textDecoration: "none", fontWeight: "bold" }
};

export default NewsList;