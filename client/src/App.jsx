import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import your page components
import HomePage from './pages/HomePage';
import ThemePage from './pages/ThemePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div className="app-container">
      {/* Simple Navigation Header */}
      <header className="app-header">
        <Link to="/" className="header-title">
          The Dry Fruit Store
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        <Routes>
          {/* Route 1: The Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Route 2: The Theme Page (e.g., /theme/60f1c...a) */}
          <Route path="/theme/:themeId" element={<ThemePage />} />

          {/* Route 3: The "Read More" Product Page (e.g., /product/60f2d...b) */}
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;