import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMenuItems, deleteMenuItem } from "../services/MenuService";

interface MenuListLoggedIn {
  _id: string;
  name: string;
  price: number;
}

const MenuListLoggedIn: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuListLoggedIn[]>([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await getAllMenuItems();
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem(id);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            {item.name} - {item.price} SEK
            <Link to={`/menu/edit/${item._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuListLoggedIn;