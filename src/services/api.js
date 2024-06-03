// src/api.js
import axios from 'axios';

const URL_API = process.env.EXPO_PUBLIC_URL_API;

const apiClient = axios.create({
  baseURL: URL_API || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;