import axios from "axios";

const API_BASE_URL = "https://localhost:7170/api";

interface CreateBookInput {
  title: string;
  author: string;
  description: string;
}

export const api = {
  getBooks: () => axios.get(`${API_BASE_URL}/books`),
  createBook: (book: CreateBookInput) => axios.post(`${API_BASE_URL}/books`, book),
  updateBook: (id: number, book: CreateBookInput) =>
    axios.put(`${API_BASE_URL}/books/${id}`, book),
  deleteBook: (id: number) => axios.delete(`${API_BASE_URL}/books/${id}`),
};