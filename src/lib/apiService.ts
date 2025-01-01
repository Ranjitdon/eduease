// src/lib/apiService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

export const getExampleData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}example/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
