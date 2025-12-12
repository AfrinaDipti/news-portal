
import { useEffect, useState } from "react";
import { getNews, getUsers, deleteNews } from "../services/api"; 
import { Link, useNavigate } from "react-router-dom";

function NewsList() {
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
    else navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      const usersRes = await getUsers();
      setUsers(usersRes.data);

      const newsRes = await getNews(page, 6);
      
      const fetchedNews = newsRes.data.data || newsRes.data; 
      
      setNews(fetchedNews);

      if (fetchedNews.length < 6) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    };

    fetchData();
  }, [currentUser, page]); 

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this post?")) {
      await deleteNews(id);

      const res = await getNews(page, 4);
      setNews(res.data.data || res.data);
    }
  };

  const getAuthor = (id) => users.find(u => String(u.id) === String(id))?.name || "Unknown";

  if (!currentUser) return null;

  return (
    <div className="list-container">
      <div className="header-row">
        <div>
          <h2>Latest News</h2>
          <p style={{ margin: 0, color: "gray" }}>Page {page}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/news/create" className="btn btn-primary">+ Create</Link>
          <button onClick={handleLogout} className="btn btn-dark">Logout</button>
        </div>
      </div>

      <div className="news-grid">
        {news.map((item) => (
          <div key={item.id} className="news-card">
            <div>
              <h3>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#6b7280", fontStyle: "italic" }}>
                By {getAuthor(item.author_id)}
              </p>
              <p style={{ lineHeight: "1.5", color: "#374151" }}>
                {item.body.length > 100 ? item.body.substring(0, 100) + "..." : item.body}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Link to={`/news/${item.id}`} className="btn btn-secondary" style={{ flex: 1, textAlign: "center" }}>Read</Link>
              {String(currentUser.id) === String(item.author_id) && (
                <>
                  <Link to={`/news/edit/${item.id}`} className="btn btn-edit" style={{ flex: 1, textAlign: "center" }}>Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger" style={{ flex: 1 }}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION BUTTONS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px" }}>
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1} 
          className="btn btn-secondary"
          style={{ width: "auto" }}
        >
          ← Previous
        </button>

        <button 
          onClick={() => setPage(page + 1)} 
          disabled={!hasMore}
          className="btn btn-primary"
          style={{ width: "auto" }}
        >
          Next →
        </button>
      </div>

    </div>
  );
}

export default NewsList;