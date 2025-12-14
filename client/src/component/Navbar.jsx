import React, { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { slugifyThemeName } from '../utils/slugify';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [elevated, setElevated] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [stripHeight, setStripHeight] = useState(0);
  const [isStripVisible, setIsStripVisible] = useState(true);
  const lastScrollY = useRef(0);
  const shopMenuRef = useRef(null);
  const mobileShopMenuRef = useRef(null);
  const mobileShopDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      setIsSmallScreen(window.innerWidth < 640); // sm breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get strip height and visibility on mount, resize, and periodically
  useEffect(() => {
    const updateStripInfo = () => {
      const stripElement = document.querySelector('[data-strip-component]');
      if (stripElement) {
        setStripHeight(stripElement.offsetHeight);
        // Check if strip is visible (not translated up)
        const isVisible = !stripElement.classList.contains('-translate-y-full');
        setIsStripVisible(isVisible);
      }
    };
    
    updateStripInfo();
    window.addEventListener('resize', updateStripInfo);
    
    // Also check periodically to catch strip visibility changes
    const interval = setInterval(updateStripInfo, 100);
    
    return () => {
      window.removeEventListener('resize', updateStripInfo);
      clearInterval(interval);
    };
  }, []);

  // Scroll listener - handles both hide/show and elevated shadow
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      
      // Check if at top of page (use stripHeight for small screens, 50px for large)
      const threshold = isSmallScreen && stripHeight > 0 ? stripHeight : 50;
      setIsAtTop(scrollY < threshold);
      
      // Update strip visibility check
      const stripElement = document.querySelector('[data-strip-component]');
      if (stripElement) {
        const isVisible = !stripElement.classList.contains('-translate-y-full');
        setIsStripVisible(isVisible);
      }
      
      // Handle hide/show on scroll direction
      if (scrollY > lastScrollY.current) {
        // Scrolling DOWN → hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling UP → show navbar
        setShowNavbar(true);
      }
      lastScrollY.current = scrollY;

      // Handle elevated shadow effect
      if (scrollY > 10) {
        setElevated(true);     // Add shadow when scrolling
      } else {
        setElevated(false);    // Remove shadow at top
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSmallScreen, stripHeight]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close menus if clicking on a link or inside a link (let the link handle navigation)
      const clickedLink = event.target.closest('a');
      if (clickedLink) {
        return;
      }

      // Check if click is inside mobile shop menu dropdown - don't close anything in this case
      if (mobileShopDropdownRef.current && mobileShopDropdownRef.current.contains(event.target)) {
        return;
      }

      // Check if click is inside mobile shop menu container (button area)
      if (mobileShopMenuRef.current && mobileShopMenuRef.current.contains(event.target)) {
        // If clicking on the button itself, let it toggle (don't close)
        if (event.target.closest('button')) {
          return;
        }
      }

      // Check if click is outside desktop shop menu
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target)) {
        setShopMenuOpen(false);
      }
      // Check if click is outside mobile shop menu button area (but not the dropdown)
      if (mobileShopMenuRef.current && !mobileShopMenuRef.current.contains(event.target)) {
        // Only close shop menu if clicking outside mobile menu entirely
        if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
          setShopMenuOpen(false);
        }
      }
      // Check if click is outside mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shopCategories = [
    'Nuts & Dry Fruits',
    'Dates',
    'Exclusives',
    'Berries',
    'Seeds & More',
    'Gift Boxes'
  ];

  // Calculate top position based on screen size and scroll position
  const getTopStyle = () => {
    // Large screens: keep original behavior using classes
    if (!isSmallScreen) {
      return {};
    }
    
    // Small screens: prevent navbar from covering strip
    // If strip is visible and we're at the top (scrollY <= strip height), position below strip
    // Otherwise, allow navbar to go to top-0
    if (isStripVisible && stripHeight > 0) {
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      if (scrollY <= stripHeight) {
        return { top: `${stripHeight}px` };
      }
    }
    return { top: '0px' };
  };

  const topStyle = getTopStyle();
  const topClass = !isSmallScreen 
    ? (isAtTop ? 'top-10 sm:top-[50px] md:top-[52px]' : 'top-0')
    : '';

  return (
    <nav
      className={`fixed w-full bg-white text-black transition-all duration-100 ease-in-out z-[1000] ${
        topClass
      } ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${elevated ? 'shadow-[0px_2px_20px_rgba(0,0,0,0.35)]' : 'shadow-none'}`}
      style={isSmallScreen ? topStyle : {}}
    >
      <div className="min-h-[48px] sm:min-h-16 flex items-center justify-between px-4 sm:px-8 md:px-12">
        {/* Logo/Brand */}
        <h1 className="flex-grow text-base sm:text-xl md:text-2xl font-semibold m-0">
          <Link 
            to="/" 
            className="text-black no-underline font-semibold hover:opacity-80 transition-opacity"
          >
            DS Dryfruits
          </Link>
        </h1>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-black text-[0.95rem] py-1.5 px-3 hover:opacity-70 transition-opacity no-underline"
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div className="relative" ref={shopMenuRef}>
            <button
              onClick={() => setShopMenuOpen(!shopMenuOpen)}
              className="text-black text-[0.95rem] py-1.5 px-3 hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer"
            >
              shop +
            </button>
            {shopMenuOpen && (
              <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-2 z-50 border border-gray-100">
                {shopCategories.map((category) => (
                  <Link
                    key={category}
                    to={`/themes/${slugifyThemeName(category)}`}
                    onClick={() => setShopMenuOpen(false)}
                    className="block w-full text-left text-[#2c2c2c] text-base font-medium py-2 px-6 hover:bg-[#f5f5f5] transition-colors no-underline"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            to="/about" 
            className="text-black text-[0.95rem] py-1.5 px-3 hover:opacity-70 transition-opacity no-underline"
          >
            About Us
          </Link>

          <Link 
            to="/bulk" 
            className="text-black text-[0.95rem] py-1.5 px-3 hover:opacity-70 transition-opacity no-underline"
          >
            Bulk Order
          </Link>

          <Link 
            to="/contact" 
            className="text-black text-[0.95rem] py-1.5 px-3 hover:opacity-70 transition-opacity no-underline"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center text-black bg-transparent border-none cursor-pointer p-2"
          aria-label="menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-2 z-50 md:hidden border border-gray-100"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#2c2c2c] text-base py-2 px-6 hover:bg-[#f5f5f5] transition-colors no-underline"
            >
              Home
            </Link>
            <div className="relative" ref={mobileShopMenuRef}>
              <button
                onClick={() => setShopMenuOpen(!shopMenuOpen)}
                className="w-full text-left text-[#2c2c2c] text-base py-2 px-6 hover:bg-[#f5f5f5] transition-colors bg-transparent border-none cursor-pointer"
              >
                Shop +
              </button>
              {shopMenuOpen && (
                <div 
                  ref={mobileShopDropdownRef}
                  className="ml-4 mt-1 bg-white rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-2 border border-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  {shopCategories.map((category) => {
                    const categoryPath = `/themes/${slugifyThemeName(category)}`;
                    return (
                      <div
                        key={category}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShopMenuOpen(false);
                          setMobileMenuOpen(false);
                          navigate(categoryPath);
                        }}
                        className="block w-full text-left text-[#2c2c2c] text-base font-medium py-2 px-6 hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#2c2c2c] text-base py-2 px-6 hover:bg-[#f5f5f5] transition-colors no-underline"
            >
              About Us
            </Link>
            <Link
              to="/bulk"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#2c2c2c] text-base py-2 px-6 hover:bg-[#f5f5f5] transition-colors no-underline"
            >
              Bulk Order
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#2c2c2c] text-base py-2 px-6 hover:bg-[#f5f5f5] transition-colors no-underline"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
