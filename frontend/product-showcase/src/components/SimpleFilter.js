import React, { useRef } from 'react';
import './ProductFilter.css';

const SimpleFilter = ({ onFilterChange }) => {
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const minPopularityRef = useRef(null);
  const maxPopularityRef = useRef(null);

  const handleFilterSubmit = () => {
    const filters = {};
    
    const minPrice = minPriceRef.current?.value;
    const maxPrice = maxPriceRef.current?.value;
    const minPopularity = minPopularityRef.current?.value;
    const maxPopularity = maxPopularityRef.current?.value;
    
    if (minPrice && minPrice !== '') filters.minPrice = minPrice;
    if (maxPrice && maxPrice !== '') filters.maxPrice = maxPrice;
    if (minPopularity && minPopularity !== '') filters.minPopularity = minPopularity;
    if (maxPopularity && maxPopularity !== '') filters.maxPopularity = maxPopularity;
    
    console.log('Applying filters:', filters);
    onFilterChange(filters);
  };

  const resetFilters = () => {
    if (minPriceRef.current) minPriceRef.current.value = '';
    if (maxPriceRef.current) maxPriceRef.current.value = '';
    if (minPopularityRef.current) minPopularityRef.current.value = '';
    if (maxPopularityRef.current) maxPopularityRef.current.value = '';
    onFilterChange({});
  };

  return (
    <div className="product-filter">
      <h3>Filter Products</h3>
      
      <div className="filter-group">
        <label>Price Range ($)</label>
        <div className="range-inputs">
          <input
            ref={minPriceRef}
            type="number"
            placeholder="Min"
            min="0"
            step="0.01"
            onChange={handleFilterSubmit}
          />
          <span>to</span>
          <input
            ref={maxPriceRef}
            type="number"
            placeholder="Max"
            min="0"
            step="0.01"
            onChange={handleFilterSubmit}
          />
        </div>
      </div>
      
      <div className="filter-group">
        <label>Popularity Score (0-1)</label>
        <div className="range-inputs">
          <input
            ref={minPopularityRef}
            type="number"
            placeholder="Min"
            min="0"
            max="1"
            step="0.1"
            onChange={handleFilterSubmit}
          />
          <span>to</span>
          <input
            ref={maxPopularityRef}
            type="number"
            placeholder="Max"
            min="0"
            max="1"
            step="0.1"
            onChange={handleFilterSubmit}
          />
        </div>
      </div>
      
      <button className="reset-btn" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default SimpleFilter;
