import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import CreateNews from "./pages/CreateNews";
import EditNews from "./pages/EditNews";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays at the top always */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/news/edit/:id" element={<EditNews />} />
          <Route path="/create" element={<CreateNews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;