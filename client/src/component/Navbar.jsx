import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [shopAnchorEl, setShopAnchorEl] = useState(null);
  const shopOpen = Boolean(shopAnchorEl);
  const [showNavbar, setShowNavbar] = useState(true);
  const [elevated, setElevated] = useState(false);
  const lastScrollY = useRef(0);

  const handleShopClick = (event) => {
    setShopAnchorEl(event.currentTarget);
  };

  const handleShopClose = () => {
    setShopAnchorEl(null);
  };

  // Scroll listener - handles both hide/show and elevated shadow
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      // Handle hide/show on scroll direction
      if (window.scrollY > lastScrollY.current) {
        // Scrolling DOWN → hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling UP → show navbar
        setShowNavbar(true);
      }
      lastScrollY.current = window.scrollY;

      // Handle elevated shadow effect
      if (window.scrollY > 10) {
        setElevated(true);     // Add shadow when scrolling
      } else {
        setElevated(false);    // Remove shadow at top
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shopCategories = [
    'Nuts & Dry Fruits',
    'Dates',
    'DFH Exclusives',
    'Berries',
    'Seeds & More',
    'Gift Boxes'
  ];

  return (
    <AppBar 
      position="fixed"   // <-- Navbar stays visible on scroll
      sx={{ 
        backgroundColor: '#fff',     // White navbar
        color: '#000',               // Black text
        transition: "transform 0.1s ease, box-shadow 0.3s ease, background-color 0.3s ease", // smooth animations
        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
        boxShadow: elevated ? "0px 2px 20px rgba(0,0,0,0.35)" : "none",
        paddingY: 1,
        paddingX: 3,
        marginBottom: 4,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link 
            to="/" 
            style={{ 
              color: '#000', 
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            The Dry Fruit Store
          </Link>
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Button 
            component={Link} 
            to="/" 
            sx={{ color: '#000', fontSize: '0.95rem' }}    // Make button text black
          >
            Home
          </Button>

        
          <Button
            onClick={handleShopClick}
            sx={{ color: '#000', fontSize: '0.95rem' }}    // Make button text black
          >
            shop +
          </Button>
          <Menu
            anchorEl={shopAnchorEl}
            open={shopOpen}
            onClose={handleShopClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            {shopCategories.map((category) => (
              <MenuItem
                key={category}
                onClick={handleShopClose}
                sx={{
                  color: '#2c2c2c',
                  fontSize: '1rem',
                  fontFamily: 'sans-serif',
                  fontWeight: 500,
                  py: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  }
                }}
              >
                {category}
              </MenuItem>
            ))}
          </Menu>

          <Button 
            component={Link} 
            to="/about" 
            sx={{ color: '#000', fontSize: '0.95rem' }}
          >
            About Us
          </Button>

          <Button 
            component={Link} 
            to="/bulk" 
            sx={{ color: '#000', fontSize: '0.95rem' }}
          >
            Bulk Order
          </Button>

          <Button 
            component={Link} 
            to="/contact" 
            sx={{ color: '#000', fontSize: '0.95rem' }}
          >
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
