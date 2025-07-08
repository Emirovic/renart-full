import React, { useState } from 'react';
import './ProductFilter.css';

const ProductFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minPopularity: '',
    maxPopularity: ''
  });

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '') cleanFilters[key] = filters[key];
    });
    onFilterChange(cleanFilters);
  };

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minPopularity: '',
      maxPopularity: ''
    });
    onFilterChange({});
  };

  return (
    <div className="product-filter">
      <h3>Filter Products</h3>
      <div className="filter-group">
        <label>Price Range ($)</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={e => handleInputChange('minPrice', e.target.value)}
            min="0"
            step="0.01"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={e => handleInputChange('maxPrice', e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <div className="filter-group">
        <label>Popularity Score (0-1)</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPopularity}
            onChange={e => handleInputChange('minPopularity', e.target.value)}
            min="0"
            max="1"
            step="0.1"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPopularity}
            onChange={e => handleInputChange('maxPopularity', e.target.value)}
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </div>
      <button className="filter-btn" onClick={applyFilters}>
        Apply Filters
      </button>
      <button className="reset-btn" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;
