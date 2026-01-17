const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const SECRET_KEY = "news-portal-secret-key";

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/news-portal')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Could not connect to MongoDB:', err));

// 3. Database Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
});
const User = mongoose.model('User', userSchema);

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  author: String,
  timestamp: { type: Date, default: Date.now },
  // Defined comments array structure
  comments: [{
    user: String,
    text: String,
    date: { type: Date, default: Date.now }
  }]
});
const News = mongoose.model('News', newsSchema);

// 4. Routes (Now prefixed with /api)

// --- AUTH ROUTES ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/seed', async (req, res) => {
  try {
    try { await User.collection.drop(); } catch (e) {}
    const passwordHash = await bcrypt.hash("password123", 10);
    await User.insertMany([
      { name: "Alice Rahman", email: "alice@example.com", password: passwordHash, role: "admin" },
      { name: "Karim Hossain", email: "karim@example.com", password: passwordHash, role: "user" },
      { name: "Nusrat Jahan", email: "nusrat@example.com", password: passwordHash, role: "user" }
    ]);
    res.send("Database seeded!");
  } catch (err) {
    res.status(500).send("Error seeding database");
  }
});

// --- NEWS ROUTES ---
app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find().sort({ timestamp: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news" });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const newPost = new News(req.body);
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Error saving news" });
  }
});

app.get('/api/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news" });
  }
});

app.put('/api/news/:id', async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: "Error updating news" });
  }
});

// SECURE DELETE ROUTE
app.delete('/api/news/:id', async (req, res) => {
  try {
    // 1. Get Token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];

    // 2. Verify User
    const decoded = jwt.verify(token, SECRET_KEY);

    // 3. Find the News Item
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    // 4. SMART CHECK: Allow if Admin OR if User is the Author
    if (decoded.role === 'admin' || decoded.name === news.author) {
      await News.findByIdAndDelete(req.params.id);
      res.json({ message: "News deleted successfully" });
    } else {
      // If neither, block them
      return res.status(403).json({ message: "Forbidden: You can only delete your own news" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error or Invalid Token" });
  }
});

// --- COMMENT ROUTE (NEW) ---
app.post('/api/news/:id/comments', async (req, res) => {
  try {
    const { user, text } = req.body;
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    // Add comment to the beginning of the array
    news.comments.unshift({ user, text });
    await news.save();

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});