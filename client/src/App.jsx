import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Carousel from './component/Carousel';

import HomePage from './page/Home';


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
          
        </Routes>
      </main>
    </div>
    
  );
}

export default App;