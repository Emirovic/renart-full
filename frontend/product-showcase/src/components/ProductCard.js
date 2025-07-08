import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('yellow');

  const colorOptions = [
    { name: 'yellow', label: 'Yellow Gold', color: '#FFD700' },
    { name: 'white', label: 'White Gold', color: '#F5F5F5' },
    { name: 'rose', label: 'Rose Gold', color: '#E8B4A0' }
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.images[selectedColor]} 
          alt={product.name}
          className="product-image"
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)} USD</p>
        
        <div className="color-selector">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
              style={{ backgroundColor: color.color }}
              onClick={() => handleColorChange(color.name)}
              title={color.label}
            />
          ))}
        </div>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${i < Math.floor(product.popularityOutOfFive) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">{product.popularityOutOfFive}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
