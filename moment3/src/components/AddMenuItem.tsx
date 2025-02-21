import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMenuItem } from "../services/MenuService";

const AddMenuItem: React.FC = () => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMenuItem(menuItem, token);
      navigate("/");
    } catch (error) {
      console.error(" Error creating menu item:", error);
    }
  };

  return (
    <div>
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={menuItem.name} placeholder="Name" onChange={handleChange} required />
        <input type="text" name="description" value={menuItem.description} placeholder="Description" onChange={handleChange} />
        <input type="number" name="price" value={menuItem.price} placeholder="Price" onChange={handleChange} required />
        <input type="text" name="category" value={menuItem.category} placeholder="Category" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
