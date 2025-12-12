
import { useEffect, useState } from "react";
import { getUsers } from "../services/api"; 
import { useNavigate } from "react-router-dom"; 

function Login() {
  const [users, setUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const handleLogin = () => {
    if (!selectedUser) return alert("Select a user!");
    const foundUser = users.find((u) => String(u.id) === String(selectedUser));
    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/news");
    }
  };

  return (
    <div className="centered-container">
      
      {/* THIS CLASS makes the white box */}
      <div className="form-card">
        <h2 style={{ textAlign: "center", color: "#2563eb" }}>Login</h2>
        
        <div className="form-group">
          <label>Select Profile</label>
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">-- Choose User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <button onClick={handleLogin} className="btn btn-primary">
          Enter Portal
        </button>
      </div>
    </div>
  );
}

export default Login;