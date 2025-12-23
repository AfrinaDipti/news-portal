// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000; // We use 5000 for real backend

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB (Ensure MongoDB is running locally)
mongoose.connect('mongodb://127.0.0.1:27017/news-portal')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. Define Schemas & Models

// --- Helper to convert _id to id ---
const toJSONConfig = {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; }
};

// USER SCHEMA
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
userSchema.set('toJSON', toJSONConfig);
const User = mongoose.model('User', userSchema);

// NEWS SCHEMA
const newsSchema = new mongoose.Schema({
  title: String,
  body: String,
  author_id: String, // Storing author ID as string to match User ID
  comments: [{
    id: Number,
    text: String,
    user_id: String,
    timestamp: String
  }]
}, { timestamps: true }); // Adds createdAt automatically

newsSchema.set('toJSON', toJSONConfig);
const News = mongoose.model('News', newsSchema);

// 3. API Routes

// --- SEED DATA (Run this once to get users) ---
app.post('/seed', async (req, res) => {
  await User.deleteMany({});
  const users = await User.create([
    { name: "Alice Rahman", email: "alice@example.com" },
    { name: "Karim Hossain", email: "karim@example.com" },
    { name: "Nusrat Jahan", email: "nusrat@example.com" }
  ]);
  res.json({ message: "Database seeded!", users });
});

// --- USER ROUTES ---
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// --- NEWS ROUTES ---

// GET All News (With Pagination)
app.get('/news', async (req, res) => {
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._per_page) || 10;

  try {
    const news = await News.find()
      .sort({ createdAt: -1 }) // Newest first
      .skip((page - 1) * limit)
      .limit(limit);

    // Count for pagination checks
    const count = await News.countDocuments();

    // mimic json-server response structure if needed, or just send array
    // For your current frontend logic, simple array works,
    // but for pagination logic, we return the data.
    res.json({
      data: news,
      items: count,
      pages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET One News
app.get('/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE News
app.post('/news', async (req, res) => {
  try {
    const newPost = new News(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE News (Patch)
app.patch('/news/:id', async (req, res) => {
  try {
    const updatedPost = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE News
app.delete('/news/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Express Server running on http://localhost:${PORT}`);
});