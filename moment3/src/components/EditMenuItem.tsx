import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItemById, updateMenuItem } from "../services/MenuService";

interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

const EditMenuItem: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); //Gör `id` valfritt
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState<MenuItem>({
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (!id) {
      console.error("Error: Missing ID for editing!");
      return;
    }
    fetchMenuItem();
  }, [id]); //Lägg till `id` som beroende

  const fetchMenuItem = async () => {
    if (!id) return; //Om `id` är undefined, gör inget
    try {
      console.log(`Fetching menu item with ID: ${id}`);
      const response = await getMenuItemById(id);
      console.log("API Response:", response.data);

      if (!response.data) {
        console.error("No data received from API!");
        return;
      }

      setMenuItem(response.data);
    } catch (error) {
      console.error("Error fetching menu item:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value, //Fixar konvertering av `price`
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return; //Om `id` saknas, avbryt

    try {
      await updateMenuItem(id, menuItem);
      navigate("/");
    } catch (error) {
      console.error(" Error updating menu item:", error);
    }
  };

  return (
    <div>
      <h2>Edit Menu Item</h2>
      {menuItem._id ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={menuItem.name} onChange={handleChange} required />
          <input type="text" name="description" value={menuItem.description} onChange={handleChange} />
          <input type="number" name="price" value={menuItem.price} onChange={handleChange} required />
          <input type="text" name="category" value={menuItem.category} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p>Loading...</p> //Visa "Loading" om datan inte laddats än
      )}
    </div>
  );
};

export default EditMenuItem;
