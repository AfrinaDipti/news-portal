// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000";

export const getUsers = () => axios.get(`${API_URL}/users`);


export const getNews = (page = 1, limit = 4) => {
  return axios.get(`${API_URL}/news?_page=${page}&_per_page=${limit}`);
};

export const getNewsById = (id) => axios.get(`${API_URL}/news/${id}`);
export const createNews = (data) => axios.post(`${API_URL}/news`, data);
export const updateNews = (id, data) => axios.patch(`${API_URL}/news/${id}`, data);
export const deleteNews = (id) => axios.delete(`${API_URL}/news/${id}`);