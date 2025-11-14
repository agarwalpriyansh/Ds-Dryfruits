import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './page/Home';
import ThemeDetail from './page/ThemeDetail';
import ProductDetail from './page/ProductDetail';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="app-container">
      <Navbar  />

      {/* Main Content Area */}
      <main className="app-main" style={{ paddingTop: '80px' }}>
        <Routes>
          {/* Route 1: The Home Page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/themes/:themeSlug" element={<ThemeDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;