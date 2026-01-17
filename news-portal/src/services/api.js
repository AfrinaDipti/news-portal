// Base URL now includes /api
const API_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
};

export const getNews = async () => {
  const response = await fetch(`${API_URL}/news`);
  return response.json();
};

export const getNewsById = async (id) => {
  const response = await fetch(`${API_URL}/news/${id}`);
  if (!response.ok) throw new Error("News not found");
  return response.json();
};

export const createNews = async (newsData) => {
  const response = await fetch(`${API_URL}/news`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(newsData),
  });
  if (!response.ok) throw new Error("Failed to create news");
  return response.json();
};

export const updateNews = async (id, newsData) => {
  const response = await fetch(`${API_URL}/news/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(newsData),
  });
  if (!response.ok) throw new Error("Failed to update news");
  return response.json();
};

export const deleteNews = async (id) => {
  const response = await fetch(`${API_URL}/news/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete news");
  return response.json();
};

// NEW: Add Comment Function
export const addComment = async (id, commentData) => {
  const response = await fetch(`${API_URL}/news/${id}/comments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(commentData),
  });
  if (!response.ok) throw new Error("Failed to add comment");
  return response.json();
};