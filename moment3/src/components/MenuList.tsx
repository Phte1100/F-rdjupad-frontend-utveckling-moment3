import React, { useState, useEffect } from "react";
import { getAllMenuItems } from "../services/MenuService";


interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getAllMenuItems();
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  return (
    <div>
      <h2 className="title">Meny</h2>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Namn</th>
            <th>Pris</th>
            <th>Kategori</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price} kr</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
