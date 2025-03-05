import React, { useState, useEffect } from "react";
import { getAllBookItems, deleteBookItem } from "../services/BookService";
import Modal from "./Modal";
import EditBookItem from "./EditBookItem";

interface BookItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

const BookListLoggedIn: React.FC = () => {
  const [bookItems, setBookItems] = useState<BookItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token"); // Hämtar token från localStorage

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await getAllBookItems();
      setBookItems(response.data);
    } catch (error) {
      console.error("Error fetching book items:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBookItem(id);
      fetchBook(); // Uppdatera listan efter borttagning
    } catch (error) {
      console.error("Error deleting book item:", error);
    }
  };

  return (
    <div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Pris</th>
            <th>Kategori</th>
            {token && <th>Redigera/radera</th>} {/* Visa bara "Actions" om token finns */}
          </tr>
        </thead>
        <tbody>
          {bookItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price} kr</td>
              <td>{item.category}</td>
              {token && (
                <td>
                  {/* Visa bara knappar om token finns */}
                  <button
                    className="button is-small is-info"
                    onClick={() => {
                      setSelectedItemId(item._id);
                      setIsModalOpen(true);
                    }}
                  >
                    Redigera
                  </button>
                  <button
                    className="button is-small is-danger ml-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    Radera
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal för redigering */}
      {token && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <EditBookItem
            bookItemId={selectedItemId}
            onClose={() => setIsModalOpen(false)}
            refreshBook={fetchBook}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookListLoggedIn;
