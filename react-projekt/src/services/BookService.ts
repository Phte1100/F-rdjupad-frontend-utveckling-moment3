import axios from "axios";

const API_URL = "https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu";

interface BookItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

interface NewBookItem {
  name: string;
  price: number;
  description?: string;
  category?: string;
}


const getAllBookItems = () => axios.get<BookItem[]>(API_URL);
const getBookItemById = (id: string) => axios.get<BookItem>(`${API_URL}/${id}`);
const createBookItem = (bookItem: NewBookItem, token: string | null) =>
  axios.post<BookItem>(API_URL, bookItem, {
    headers: { Authorization: `Bearer ${token}` },
  });
const updateBookItem = (id: string, bookItem: BookItem) =>
  axios.put<BookItem>(`${API_URL}/${id}`, bookItem);
const deleteBookItem = (id: string) => axios.delete(`${API_URL}/${id}`);

export { getAllBookItems, getBookItemById, createBookItem, updateBookItem, deleteBookItem };





//const API_URL = "https://backend-baserad-webbutveckling-moment-5.onrender.com/api/menu";