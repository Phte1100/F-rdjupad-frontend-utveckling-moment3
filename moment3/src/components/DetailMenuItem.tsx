import React, { useState, useEffect } from "react";
import { getMenuItemById, updateMenuItem } from "../services/MenuService";

interface MenuItem {
    _id: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
  }

const DetailMenuItem: React.FC<MenuItem> = ({ _id, name, description, price, category }) => {
    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">{name}</p>
            </header>
            <div className="card-content">
                <div className="content">
                    <p>Pris: {description}</p>
                    <p>Pris: {price} kr</p>
                    <p>Kategori: {category}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailMenuItem;