import axios from "axios";

// CHANGE THIS URL to your new Express Backend
const API_URL = "http://localhost:5000";

export const getUsers = () => axios.get(`${API_URL}/users`);

// Express Route Logic Update:
// My Express code returns { data: [...] } for pagination.
export const getNews = (page = 1, limit = 6) => {
  return axios.get(`${API_URL}/news?_page=${page}&_per_page=${limit}`);
};

export const getNewsById = (id) => axios.get(`${API_URL}/news/${id}`);
export const createNews = (data) => axios.post(`${API_URL}/news`, data);
export const updateNews = (id, data) => axios.patch(`${API_URL}/news/${id}`, data);
export const deleteNews = (id) => axios.delete(`${API_URL}/news/${id}`);