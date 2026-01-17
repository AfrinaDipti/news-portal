import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>📰 NewsPortal</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {token ? (
          <>
            <span style={styles.user}>Hello, {user?.name || "User"}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "#333", color: "#fff" },
  logo: { margin: 0, fontSize: "1.5rem" },
  links: { display: "flex", gap: "15px", alignItems: "center" },
  link: { color: "#fff", textDecoration: "none", fontSize: "1.1rem" },
  user: { marginRight: "10px", fontWeight: "bold" },
  logoutBtn: { background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }
};

export default Navbar;