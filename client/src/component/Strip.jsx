import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Strip() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showStrip, setShowStrip] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll listener - hide strip when scrolling down on small screens
  useEffect(() => {
    if (!isSmallScreen) {
      setShowStrip(true);
      return;
    }

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY.current) {
          // Scrolling DOWN → hide strip
          setShowStrip(false);
        } else {
          // Scrolling UP → show strip
          setShowStrip(true);
        }
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSmallScreen]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100, // Above navbar
        transition: 'transform 0.3s ease',
        transform: isSmallScreen && !showStrip ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      {/* Light Teal Top Strip */}
      <Box
        sx={{
          width: '100%',
          height: '8px',
          backgroundColor: '#7FD8D2', // Light teal color
        }}
      />

      {/* Dark Maroon Main Section */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#800020', // Dark maroon color
          padding: {
            xs: '10px 16px',
            sm: '10px 20px',
            md: '12px 40px',
          },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: {
            xs: 'row',
            sm: 'row',
          },
          gap: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        {/* Small Screen: Show Text */}
        {isSmallScreen ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.8rem',
                },
                fontWeight: 400,
                textAlign: 'center',
                lineHeight: 1.3,
                padding: {
                  xs: '6px 8px',
                },
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              Dry Fruit House - Eat Healthy (Nuts & Dry Fruits, Seeds, Dates, Berries and more!)
            </Typography>
          </Box>
        ) : (
          <>
            {/* Left Side - Contact Information */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: {
                  xs: 1.5,
                  sm: 2,
                  md: 3,
                },
                flexWrap: 'wrap',
                justifyContent: {
                  xs: 'center',
                  sm: 'flex-start',
                },
              }}
            >
          {/* Phone */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#D3D3D3', // Light gray text
            }}
          >
            <Box sx={{ 
              display: 'flex',
              '& svg': {
                width: { xs: 12, sm: 14, md: 16 },
                height: { xs: 12, sm: 14, md: 16 },
              }
            }}>
              <Phone size={16} />
            </Box>
            <Typography
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.75rem',
                  md: '0.875rem',
                },
                color: '#D3D3D3',
                fontWeight: 400,
                whiteSpace: 'nowrap',
              }}
            >
              +91-7483600212
            </Typography>
          </Box>

          {/* Email */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#D3D3D3', // Light gray text
            }}
          >
            <Box sx={{ 
              display: 'flex',
              '& svg': {
                width: { xs: 12, sm: 14, md: 16 },
                height: { xs: 12, sm: 14, md: 16 },
              }
            }}>
              <Mail size={16} />
            </Box>
            <Typography
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.75rem',
                  md: '0.875rem',
                },
                color: '#D3D3D3',
                fontWeight: 400,
                whiteSpace: {
                  xs: 'normal',
                  sm: 'nowrap',
                },
                wordBreak: {
                  xs: 'break-all',
                  sm: 'normal',
                },
              }}
            >
              info@dryfruithouse.com
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Social Media Icons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: {
              xs: 1,
              sm: 1.5,
              md: 2,
            },
            justifyContent: {
              xs: 'center',
              sm: 'flex-end',
            },
          }}
        >
          <Box
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#D3D3D3',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              display: 'flex',
              '&:hover': {
                color: '#fff',
              },
              '& svg': {
                width: { xs: 14, sm: 16, md: 18 },
                height: { xs: 14, sm: 16, md: 18 },
              }
            }}
          >
            <Facebook size={18} />
          </Box>
          <Box
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#D3D3D3',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              display: 'flex',
              '&:hover': {
                color: '#fff',
              },
              '& svg': {
                width: { xs: 14, sm: 16, md: 18 },
                height: { xs: 14, sm: 16, md: 18 },
              }
            }}
          >
            <Twitter size={18} />
          </Box>
          <Box
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#D3D3D3',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              display: 'flex',
              '&:hover': {
                color: '#fff',
              },
              '& svg': {
                width: { xs: 14, sm: 16, md: 18 },
                height: { xs: 14, sm: 16, md: 18 },
              }
            }}
          >
            <Instagram size={18} />
          </Box>
          <Box
            component="a"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#D3D3D3',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              display: 'flex',
              '&:hover': {
                color: '#fff',
              },
              '& svg': {
                width: { xs: 14, sm: 16, md: 18 },
                height: { xs: 14, sm: 16, md: 18 },
              }
            }}
          >
            <Linkedin size={18} />
          </Box>
        </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

