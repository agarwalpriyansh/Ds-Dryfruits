import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Carousel from './component/Carousel';

import HomePage from './page/Home';
import ThemeDetail from './page/ThemeDetail';


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
          <Route path="/themes/:themeSlug" element={<ThemeDetail />} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;