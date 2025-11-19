import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './page/Home';
import ThemeDetail from './page/ThemeDetail';
import ProductDetail from './page/ProductDetail';
import Navbar from './component/Navbar';
import Strip from './component/Strip';
import TrustStrip from './component/TrustStrip';
import Footer from './component/Footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <div><Strip/></div>
      <div><Navbar/></div>

      {/* Main Content Area */}
      <main className="flex-1   md:pt-[71px]">
        <Routes>
          {/* Route 1: The Home Page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/themes/:themeSlug" element={<ThemeDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
      <TrustStrip />
      <Footer />
    </div>

  );
}

export default App;