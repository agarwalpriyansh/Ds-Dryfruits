import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2c2c2c',
        color: '#fff',
        paddingTop: {
          xs: 4,
          sm: 5,
          md: 6,
        },
        paddingBottom: {
          xs: 3,
          sm: 4,
          md: 5,
        },
        marginTop: {
          xs: 4,
          sm: 6,
          md: 8,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: '1.1rem',
                  sm: '1.25rem',
                  md: '1.5rem',
                },
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              The Dry Fruit Store
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: '0.85rem',
                  sm: '0.9rem',
                  md: '1rem',
                },
                color: '#b0b0b0',
                lineHeight: 1.6,
              }}
            >
              Your trusted source for premium quality dry fruits and nuts. 
              Fresh, healthy, and delivered to your doorstep.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem',
                },
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Link
                to="/"
                style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#fff')}
                onMouseLeave={(e) => (e.target.style.color = '#b0b0b0')}
              >
                Home
              </Link>
              <Link
                to="/about"
                style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#fff')}
                onMouseLeave={(e) => (e.target.style.color = '#b0b0b0')}
              >
                About Us
              </Link>
              <Link
                to="/bulk"
                style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#fff')}
                onMouseLeave={(e) => (e.target.style.color = '#b0b0b0')}
              >
                Bulk Order
              </Link>
              <Link
                to="/contact"
                style={{
                  color: '#b0b0b0',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#fff')}
                onMouseLeave={(e) => (e.target.style.color = '#b0b0b0')}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem',
                },
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              Contact
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#b0b0b0',
                }}
              >
                <Phone size={16} />
                <Typography
                  sx={{
                    fontSize: {
                      xs: '0.85rem',
                      sm: '0.9rem',
                    },
                  }}
                >
                  +91-7483600212
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#b0b0b0',
                }}
              >
                <Mail size={16} />
                <Typography
                  sx={{
                    fontSize: {
                      xs: '0.85rem',
                      sm: '0.9rem',
                    },
                    wordBreak: 'break-word',
                  }}
                >
                  info@dryfruithouse.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.1rem',
                  md: '1.25rem',
                },
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              Follow Us
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Box
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  '&:hover': {
                    color: '#fff',
                  },
                  '& svg': {
                    width: { xs: 20, sm: 22, md: 24 },
                    height: { xs: 20, sm: 22, md: 24 },
                  }
                }}
              >
                <Facebook size={24} />
              </Box>
              <Box
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  '&:hover': {
                    color: '#fff',
                  },
                  '& svg': {
                    width: { xs: 20, sm: 22, md: 24 },
                    height: { xs: 20, sm: 22, md: 24 },
                  }
                }}
              >
                <Twitter size={24} />
              </Box>
              <Box
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  '&:hover': {
                    color: '#fff',
                  },
                  '& svg': {
                    width: { xs: 20, sm: 22, md: 24 },
                    height: { xs: 20, sm: 22, md: 24 },
                  }
                }}
              >
                <Instagram size={24} />
              </Box>
              <Box
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#b0b0b0',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  '&:hover': {
                    color: '#fff',
                  },
                  '& svg': {
                    width: { xs: 20, sm: 22, md: 24 },
                    height: { xs: 20, sm: 22, md: 24 },
                  }
                }}
              >
                <Linkedin size={24} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            marginTop: {
              xs: 3,
              sm: 4,
              md: 5,
            },
            paddingTop: {
              xs: 2,
              sm: 3,
            },
            borderTop: '1px solid #444',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: '0.75rem',
                sm: '0.85rem',
                md: '0.9rem',
              },
              color: '#888',
            }}
          >
            © {new Date().getFullYear()} The Dry Fruit Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

