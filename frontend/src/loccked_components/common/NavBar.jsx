import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const NavBar = ({ siteName, navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (onClick) => {
    onClick();
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center w-full mt-6 sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border/50 px-4 py-3 rounded-lg shadow-lg">
      {/* Logo/Site Name */}
      <div className="text-foreground text-black text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text  hover:scale-105 transition-transform duration-200 cursor-pointer">
        {siteName}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center z-50">
        <button 
          onClick={toggleMenu} 
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Desktop Navigation Items */}
      <div className="hidden md:flex md:items-center md:gap-2  ">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuItemClick(item.onClick)}
            aria-label={item.ariaLabel}
            className="relative px-4 py-2 text-foreground font-medium transition-all duration-200 rounded-lg hover:bg-secondary/50 hover:scale-105 group overflow-hidden"
          >
            <span className="relative z-10">{item.text}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
          </button>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          <div className="md:hidden fixed top-0 right-0 h-full w-screen max-w-[85vw] bg-gray-400 border-l border-border z-40 animate-slide-in-right shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
              <div className="text-foreground text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {siteName}
              </div>
              
            </div>

            <div className="flex flex-col p-6 gap-2 bg-amber-600">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item.onClick)}
                  aria-label={item.ariaLabel}
                  className="text-left text-lg font-medium text-foreground hover:text-primary transition-all duration-200 py-3 px-4 rounded-lg hover:bg-secondary/30 border-b border-border/30 last:border-b-0 group"
                >
                  <span className="block transform group-hover:translate-x-2 transition-transform duration-200">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
