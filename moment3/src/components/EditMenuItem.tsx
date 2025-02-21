import React, { useState, useEffect } from "react";
import { getMenuItemById, updateMenuItem } from "../services/MenuService";

interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

interface EditMenuItemProps {
  menuItemId: string | null;
  onClose: () => void;
  refreshMenu: () => void;
}

const EditMenuItem: React.FC<EditMenuItemProps> = ({ menuItemId, onClose, refreshMenu }) => {
  const [menuItem, setMenuItem] = useState<MenuItem>({
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (!menuItemId) return;
    fetchMenuItem(menuItemId);
  }, [menuItemId]);

  const fetchMenuItem = async (id: string) => {
    try {
      const response = await getMenuItemById(id);
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
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuItem._id) return;

    try {
      await updateMenuItem(menuItem._id, menuItem);
      refreshMenu();
      onClose();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Namn</label>
        <div className="control">
          <input className="input" type="text" name="name" value={menuItem.name} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Beskrivning</label>
        <div className="control">
          <input className="input" type="text" name="description" value={menuItem.description} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <label className="label">Pris</label>
        <div className="control">
          <input className="input" type="number" name="price" value={menuItem.price} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Kategori</label>
        <div className="control">
          <input className="input" type="text" name="category" value={menuItem.category} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">Spara ändring</button>
        </div>
      </div>
    </form>
  );
};

export default EditMenuItem;
