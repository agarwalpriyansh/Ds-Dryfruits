import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Strip() {
  const [showStrip, setShowStrip] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const lastScrollY = useRef(0);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // sm breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
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

  return (
    <div
      data-strip-component
      className={`w-full flex flex-col z-[1100] transition-transform duration-300 ease-in-out ${
        isSmallScreen && !showStrip ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      

      {/* Dark Maroon Main Section */}
      <div className="w-full bg-[#800020] py-2.5 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-10 flex justify-between items-center flex-row gap-2 sm:gap-2">
        {/* Small Screen: Show Text */}
        {isSmallScreen ? (
          <div className="w-full flex justify-center items-center">
            <p className="text-white text-[0.7rem] sm:text-[0.8rem] font-normal text-center leading-tight py-1.5 px-2 whitespace-normal break-words">
              Dry Fruit House - Eat Healthy (Nuts & Dry Fruits, Seeds, Dates, Berries and more!)
            </p>
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
                  +91-7483600212
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-1 text-[#D3D3D3]">
                <div className="flex">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </div>
                <p className="text-[0.7rem] sm:text-[0.75rem] md:text-[0.875rem] text-[#D3D3D3] font-normal whitespace-normal sm:whitespace-nowrap break-all sm:break-normal">
                  info@dryfruithouse.com
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
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D3D3D3] cursor-pointer transition-colors duration-300 ease-in-out flex hover:text-white"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
