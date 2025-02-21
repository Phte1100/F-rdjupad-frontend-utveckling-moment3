import React, { useEffect, useState } from "react";
import { getAllMenuItems } from "../services/MenuService";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
}

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

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

  return (
    <div>
      <h2>Menu List</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            {item.name} - {item.price} SEK
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
