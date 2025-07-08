import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import './ProductList.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      // Try multiple API endpoints
      const endpoints = [
        'https://renart-product-api.onrender.com/api/products', // Production API
        'http://localhost:5278/api/products',
        'https://localhost:5001/api/products',
        'http://localhost:5000/api/products',
        'https://localhost:7001/api/products',
        'http://localhost:7000/api/products'
      ];
      let response = null;
      let lastError = null;
      for (const endpoint of endpoints) {
        try {
          // Build query parameters - only include non-empty values
          const params = new URLSearchParams();
          if (filters.minPrice && filters.minPrice !== '') {
            params.append('minPrice', filters.minPrice);
          }
          if (filters.maxPrice && filters.maxPrice !== '') {
            params.append('maxPrice', filters.maxPrice);
          }
          if (filters.minPopularity && filters.minPopularity !== '') {
            params.append('minPopularity', filters.minPopularity);
          }
          if (filters.maxPopularity && filters.maxPopularity !== '') {
            params.append('maxPopularity', filters.maxPopularity);
          }
          const url = params.toString() ? `${endpoint}?${params.toString()}` : endpoint;
          response = await axios.get(url);
          break;
        } catch (err) {
          lastError = err;
        }
      }
      if (!response) {
        throw lastError || new Error('All endpoints failed');
      }
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please ensure the backend API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    fetchProducts(filters);
  };

  const sliderSettings = {
    dots: true,
    infinite: products.length > 1,
    speed: 500,
    slidesToShow: Math.min(4, products.length),
    slidesToScroll: 1,
    autoplay: products.length > 1,
    autoplaySpeed: 3000,
    arrows: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, products.length),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, products.length),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Product List</h1>
      <div className="filter-toggle">
        <button 
          className="filter-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      {showFilters && (
        <ProductFilter onFilterChange={handleFilterChange} />
      )}
      <div className="products-count">
        <p>Showing {products.length} product{products.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="carousel-container">
        {products.length > 0 ? (
          <Slider {...sliderSettings}>
            {products.map((product, index) => (
              <div key={index} className="carousel-item">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
