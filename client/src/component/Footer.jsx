import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#faf0e6] pt-16 pb-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand section */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Dry Fruit House</h2>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 tracking-widest mt-1">EAT HEALTHY</p>
              <div className="h-1 w-20 sm:w-24 bg-foreground mt-2"></div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Dry Fruit House brings you a collection of carefully selected foods from India and across the world.{' '}
              <a href="#" className="text-amber-700 font-semibold hover:underline">
                [Explore More]
              </a>
            </p>
            {/* Social icons */}
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="text-foreground hover:text-amber-700 transition" aria-label="Facebook">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-foreground hover:text-amber-700 transition" aria-label="Twitter">
                <Twitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-foreground hover:text-amber-700 transition" aria-label="Instagram">
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-foreground hover:text-amber-700 transition" aria-label="LinkedIn">
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              {['About Us', 'Contact Us', 'Bulk Ordering', 'Shopping'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-foreground transition text-xs sm:text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">Account Info</h3>
            <ul className="space-y-3 sm:space-y-4">
              {['My Account', 'Privacy Policy', 'Return Policy', 'Terms & Conditions'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-foreground transition text-xs sm:text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">Contact Details</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-2 sm:gap-3">
                <MapPin size={18} className="sm:w-5 sm:h-5 text-foreground flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  NR TOWERS, 17th Cross, Sector 4, 19th Main Rd, HSR Layout, Bengaluru - 560102
                </p>
              </div>
              <div className="flex gap-2 sm:gap-3 items-start">
                <Mail size={18} className="sm:w-5 sm:h-5 text-foreground flex-shrink-0 mt-0.5" />
                <a href="mailto:info@dryfruithouse.com" className="text-gray-600 hover:text-foreground transition text-xs sm:text-sm break-all">
                  info@dryfruithouse.com
                </a>
              </div>
              <div className="flex gap-2 sm:gap-3 items-center">
                <Phone size={18} className="sm:w-5 sm:h-5 text-foreground flex-shrink-0" />
                <a href="tel:+917483600212" className="text-gray-600 hover:text-foreground transition text-xs sm:text-sm">
                  +91-7483600212
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-600 text-xs sm:text-sm text-center md:text-left">
            Copyright © 2025 <span className="font-semibold">Dry Fruit House</span> . All Rights Reserved.
          </p>
          
          {/* Payment methods */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
            <span className="text-xs sm:text-sm text-gray-600">Payment Methods:</span>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <span className="font-bold text-foreground text-xs sm:text-sm">VISA</span>
              <span className="font-bold text-foreground text-xs sm:text-sm">PayPal</span>
              <span className="font-bold text-foreground text-xs sm:text-sm">Mastercard</span>
              <span className="font-bold text-foreground text-xs sm:text-sm">Stripe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-amber-900 hover:bg-amber-950 text-white rounded-full flex items-center justify-center transition shadow-lg z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="sm:w-6 sm:h-6" />
      </button>
    </footer>
  );
}
