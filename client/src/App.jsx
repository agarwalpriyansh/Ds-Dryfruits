import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './page/Home';
import ThemeDetail from './page/ThemeDetail';
import ProductDetail from './page/ProductDetail';
import Navbar from './component/Navbar';
import Strip from './component/Strip';

function App() {
  return (
    <div className="app-container">
      <div><Strip/></div>
      <div><Navbar/></div>

      {/* Main Content Area */}
      <main className="app-main pt-[48px] sm:pt-16 md:pt-16">
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