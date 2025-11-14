import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './page/Home';
import ThemeDetail from './page/ThemeDetail';
import ProductDetail from './page/ProductDetail';
import Navbar from './component/Navbar';
import Strip from './component/Strip';

function App() {
  return (
    <div className="app-container">
      <Strip />
      <Navbar  />

      {/* Main Content Area */}
      <Box
        component="main"
        className="app-main"
        sx={{
          paddingTop: {
            xs: '100px',  // Mobile: smaller strip (text only) + navbar
            sm: '120px',  // Tablet
            md: '130px',  // Desktop: full strip + navbar
          }
        }}
      >
        <Routes>
          {/* Route 1: The Home Page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/themes/:themeSlug" element={<ThemeDetail />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </Box>
    </div>
    
  );
}

export default App;