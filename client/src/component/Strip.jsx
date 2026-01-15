import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Strip() {
  const [showStrip, setShowStrip] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const lastScrollY = useRef(0);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // sm breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <div
      data-strip-component
      className={`w-full flex flex-col relative z-[9999] transition-transform duration-300 ease-in-out ${
        isSmallScreen && !showStrip ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      

      {/* Dark Maroon Main Section */}
      <div className="w-full bg-[#5e0404] py-2.5 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-10 flex justify-between items-center flex-row gap-2 sm:gap-2 relative">
        {/* Small Screen: Show Text */}
        {isSmallScreen ? (
          <div className="w-full flex justify-between items-center px-1">
             <div className="flex-1"></div>
             <p className="text-white text-[0.7rem] sm:text-[0.8rem] font-normal text-center leading-tight whitespace-normal break-words flex-grow-[2]">
              Dry Fruit House
             </p>
             <div className="flex-1 flex justify-end" ref={dropdownRef}>
               <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-[#D3D3D3] hover:text-white transition-colors focus:outline-none bg-transparent border-none cursor-pointer p-0"
               >
                 <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-inner">
                    <User className="w-3.5 h-3.5 text-white" />
                 </div>
               </button>
               
               {isDropdownOpen && (
                 <div className="absolute top-full right-2 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                   {isAuthenticated ? (
                     <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                     </>
                   ) : (
                     <>
                        <Link 
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Login
                        </Link>
                        <Link 
                          to="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Signup
                        </Link>
                     </>
                   )}
                 </div>
               )}
             </div>
          </div>
        ) : (
          <>
            {/* Left Side - Contact Information */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center sm:justify-start">
              {/* Phone */}
              <div className="flex items-center gap-1 text-[#D3D3D3]">
                <div className="flex">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </div>
                <p className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.875rem] text-[#D3D3D3] font-normal whitespace-nowrap">
                  +91-9024675644
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-1 text-[#D3D3D3]">
                <div className="flex">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </div>
                <p className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.875rem] text-[#D3D3D3] font-normal whitespace-normal sm:whitespace-nowrap break-all sm:break-normal">
                  dryfruits.ds@gmail.com
                </p>
              </div>
            </div>

            {/* Right Side - Social Media Icons */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 justify-center sm:justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D3D3D3] cursor-pointer transition-colors duration-300 ease-in-out flex hover:text-white"
              >
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D3D3D3] cursor-pointer transition-colors duration-300 ease-in-out flex hover:text-white"
              >
                <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D3D3D3] cursor-pointer transition-colors duration-300 ease-in-out flex hover:text-white"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </a>
              
              <div className="h-4 w-[1px] bg-[#D3D3D3] mx-1 opacity-50"></div>
              
              {/* Avatar Dropdown for Desktop */}
              <div className="relative" ref={dropdownRef}>
                 <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-[#D3D3D3] hover:text-white transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
                 >
                   <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm shadow-inner transition-transform hover:scale-105">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                   </div>
                   {isAuthenticated && (
                     <span className="hidden lg:inline text-[0.75rem] font-medium max-w-[80px] truncate">
                       {user?.name?.split(' ')[0]}
                     </span>
                   )}
                   <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                 </button>
                 
                 {isDropdownOpen && (
                   <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1.5 z-50 border border-gray-100">
                     {isAuthenticated ? (
                       <>
                          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                          </div>
                          
                          <div className="py-1">
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                            >
                              <LogOut size={15} />
                              Log Out
                            </button>
                          </div>
                       </>
                     ) : (
                       <div className="p-1">
                          <Link 
                            to="/login"
                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-900 rounded-md transition-colors no-underline"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Login to Account
                          </Link>
                          <Link 
                            to="/signup"
                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-amber-900 rounded-md transition-colors no-underline"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Create New Account
                          </Link>
                       </div>
                     )}
                   </div>
                 )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
