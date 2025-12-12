import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import CreateNews from "./pages/CreateNews"; 
import EditNews from "./pages/EditNews";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/news" element={<NewsList />} />
          
          {/* UNCOMMENT THIS ROUTE */}
          <Route path="/news/create" element={<CreateNews />} /> 
          
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/news/edit/:id" element={<EditNews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;