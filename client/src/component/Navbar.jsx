import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [shopAnchorEl, setShopAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const shopOpen = Boolean(shopAnchorEl);
  const mobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const [showNavbar, setShowNavbar] = useState(true);
  const [elevated, setElevated] = useState(false);
  const lastScrollY = useRef(0);

  const handleShopClick = (event) => {
    setShopAnchorEl(event.currentTarget);
  };

  const handleShopClose = () => {
    setShopAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
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
        top: {
          xs: '40px',  // Smaller strip on mobile (text only)
          sm: '50px',
          md: '52px',  // Full strip height on desktop
        },
        transition: "transform 0.1s ease, box-shadow 0.3s ease, background-color 0.3s ease", // smooth animations
        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
        boxShadow: elevated ? "0px 2px 20px rgba(0,0,0,0.35)" : "none",
        paddingY: {
          xs: 0.5,
          sm: 1,
        },
        paddingX: {
          xs: 1,
          sm: 2,
          md: 3,
        },
        marginBottom: 4,
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 48, sm: 64 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1,
            fontSize: {
              xs: '1rem',
              sm: '1.25rem',
              md: '1.5rem',
            }
          }}
        >
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

        {/* Desktop Navigation Buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          <Button 
            component={Link} 
            to="/" 
            sx={{ 
              color: '#000', 
              fontSize: '0.95rem',
              minWidth: 'auto',
              padding: '6px 12px',
            }}
          >
            Home
          </Button>

        
          <Button
            onClick={handleShopClick}
            sx={{ 
              color: '#000', 
              fontSize: '0.95rem',
              minWidth: 'auto',
              padding: '6px 12px',
            }}
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

        {/* Mobile Menu Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuOpen}
          sx={{ 
            display: { xs: 'flex', md: 'none' },
            color: '#000',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchorEl}
          open={mobileMenuOpen}
          onClose={handleMobileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }
          }}
        >
          <MenuItem
            component={Link}
            to="/"
            onClick={handleMobileMenuClose}
            sx={{
              color: '#2c2c2c',
              fontSize: '1rem',
              py: 2,
              px: 3,
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleMobileMenuClose();
              handleShopClick(e);
            }}
            sx={{
              color: '#2c2c2c',
              fontSize: '1rem',
              py: 2,
              px: 3,
            }}
          >
            Shop +
          </MenuItem>
          <MenuItem
            component={Link}
            to="/about"
            onClick={handleMobileMenuClose}
            sx={{
              color: '#2c2c2c',
              fontSize: '1rem',
              py: 2,
              px: 3,
            }}
          >
            About Us
          </MenuItem>
          <MenuItem
            component={Link}
            to="/bulk"
            onClick={handleMobileMenuClose}
            sx={{
              color: '#2c2c2c',
              fontSize: '1rem',
              py: 2,
              px: 3,
            }}
          >
            Bulk Order
          </MenuItem>
          <MenuItem
            component={Link}
            to="/contact"
            onClick={handleMobileMenuClose}
            sx={{
              color: '#2c2c2c',
              fontSize: '1rem',
              py: 2,
              px: 3,
            }}
          >
            Contact Us
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
