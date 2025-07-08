# Renart Product Showcase

A modern, responsive product listing application built with C# ASP.NET Core backend and React frontend.

## Features

### Backend (ASP.NET Core Web API)
- **RESTful API** serving product data from JSON file
- **Dynamic Price Calculation**: Price = (popularityScore + 1) * weight * goldPrice
- **Real-time Gold Price**: Fetches current gold prices from external API
- **Product Filtering**: Filter by price range and popularity score
- **CORS Support**: Configured for cross-origin requests

### Frontend (React)
- **Modern UI**: Clean, responsive design matching provided mockup
- **Product Carousel**: Swipeable carousel with navigation arrows
- **Color Selection**: Interactive color picker for product variants
- **Star Rating**: Popularity score displayed as 5-star rating
- **Advanced Filtering**: Filter products by price and popularity
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

### Backend
- C# / ASP.NET Core 6.0
- System.Text.Json for JSON processing
- HttpClient for external API calls
- Built-in dependency injection

### Frontend
- React 18
- Axios for API calls
- React Slick for carousel functionality
- CSS3 with responsive design
- Google Fonts (Inter & Montserrat)

## Project Structure

```
renart/
├── backend/
│   └── ProductAPI/
│       ├── Controllers/
│       │   └── ProductsController.cs
│       ├── Models/
│       │   └── Product.cs
│       ├── Services/
│       │   ├── IGoldPriceService.cs
│       │   ├── GoldPriceService.cs
│       │   ├── IProductService.cs
│       │   └── ProductService.cs
│       ├── products.json
│       └── Program.cs
├── frontend/
│   └── product-showcase/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ProductList.js
│       │   │   ├── ProductCard.js
│       │   │   ├── ProductFilter.js
│       │   │   └── *.css
│       │   ├── App.js
│       │   └── App.css
│       └── public/
└── products.json
```

## Getting Started

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend/ProductAPI
   ```

2. Run the API:
   ```bash
   dotnet run
   ```

   API will be available at:
   - HTTP: http://localhost:5000
   - HTTPS: https://localhost:5001

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend/product-showcase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

   Application will open at: http://localhost:3000

## API Endpoints

### Get All Products
```
GET /api/products
```

### Get Filtered Products
```
GET /api/products?minPrice=100&maxPrice=500&minPopularity=0.5&maxPopularity=1.0
```

Query Parameters:
- `minPrice` (decimal): Minimum price filter
- `maxPrice` (decimal): Maximum price filter
- `minPopularity` (decimal): Minimum popularity score (0-1)
- `maxPopularity` (decimal): Maximum popularity score (0-1)

## Product Data Structure

```json
{
  "name": "Product Name",
  "popularityScore": 0.85,
  "weight": 2.1,
  "images": {
    "yellow": "image_url",
    "rose": "image_url",
    "white": "image_url"
  },
  "price": 245.67,
  "popularityOutOfFive": 4.3
}
```

## Features Implemented

✅ **Backend Mock API Development**
- RESTful API with product data
- Dynamic price calculation with real-time gold prices
- Product filtering capabilities

✅ **Frontend Product Display**
- Product listing with carousel functionality
- Color picker for product variants
- Star rating system
- Responsive design

✅ **Bonus Features**
- Advanced filtering by price and popularity
- Mobile-friendly carousel with swipe support
- Modern UI with smooth transitions

## Development Notes

- The application uses a fallback gold price if the external API fails
- CORS is configured to allow requests from any origin (development only)
- All components are responsive and work on various screen sizes
- The carousel automatically plays and supports manual navigation

## Future Enhancements

- Add product details modal
- Implement product comparison feature
- Add user authentication
- Implement shopping cart functionality
- Add product reviews and ratings
