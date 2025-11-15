import React, { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [elevated, setElevated] = useState(false);
  const lastScrollY = useRef(0);
  const shopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target)) {
        setShopMenuOpen(false);
      }
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
    'DFH Exclusives',
    'Berries',
    'Seeds & More',
    'Gift Boxes'
  ];

  return (
    <nav
      className={`fixed w-full bg-white text-black top-10 sm:top-[50px] md:top-[52px] transition-all duration-100 ease-in-out z-[1000] px-4 sm:px-8 md:px-12 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${elevated ? 'shadow-[0px_2px_20px_rgba(0,0,0,0.35)]' : 'shadow-none'}`}
    >
      <div className="min-h-[48px] sm:min-h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <h1 className="flex-grow text-base sm:text-xl md:text-2xl font-semibold">
          <Link 
            to="/" 
            className="text-black no-underline font-semibold"
          >
            The Dry Fruit Store
          </Link>
        </h1>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-black text-[0.95rem] min-w-0 py-1.5 px-3 hover:opacity-70 transition-opacity"
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div className="relative" ref={shopMenuRef}>
            <button
              onClick={() => setShopMenuOpen(!shopMenuOpen)}
              className="text-black text-[0.95rem] min-w-0 py-1.5 px-3 hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer"
            >
              shop +
            </button>
            {shopMenuOpen && (
              <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-2 z-50">
                {shopCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setShopMenuOpen(false)}
                    className="w-full text-left text-[#2c2c2c] text-base font-medium py-2 px-6 hover:bg-[#f5f5f5] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link 
            to="/about" 
            className="text-black text-[0.95rem] hover:opacity-70 transition-opacity"
          >
            About Us
          </Link>

          <Link 
            to="/bulk" 
            className="text-black text-[0.95rem] hover:opacity-70 transition-opacity"
          >
            Bulk Order
          </Link>

          <Link 
            to="/contact" 
            className="text-black text-[0.95rem] hover:opacity-70 transition-opacity"
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
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-2 z-50 md:hidden"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#2c2c2c] text-base py-2 px-6 hover:bg-[#f5f5f5] transition-colors no-underline"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setShopMenuOpen(!shopMenuOpen)}
                className="w-full text-left text-[#2c2c2c] text-base py-2 px-6 hover:bg-[#f5f5f5] transition-colors bg-transparent border-none cursor-pointer"
              >
                Shop +
              </button>
              {shopMenuOpen && (
                <div className="ml-4 mt-1 bg-white rounded shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-2">
                  {shopCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setShopMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-[#2c2c2c] text-base font-medium py-2 px-6 hover:bg-[#f5f5f5] transition-colors bg-transparent border-none cursor-pointer"
                    >
                      {category}
                    </button>
                  ))}
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
