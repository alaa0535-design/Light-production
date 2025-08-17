import React from 'react';
import { Menu, X } from 'lucide-react';
import { mediaAssets } from '../data/mediaAssets';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 min-w-0">
            <img 
              src={mediaAssets.logo}
              alt="Lights Production Logo" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
            />
            <span className="text-white font-bold text-sm sm:text-lg lg:text-xl truncate">LIGHTS PRODUCTION</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-white hover:text-cyan-300 transition-colors duration-300">Home</a>
            <a href="#about" className="text-white hover:text-cyan-300 transition-colors duration-300">About</a>
            <a href="#services" className="text-white hover:text-cyan-300 transition-colors duration-300">Services</a>
            <a href="#projects" className="text-white hover:text-cyan-300 transition-colors duration-300">Projects</a>
            <a href="#contact" className="text-white hover:text-cyan-300 transition-colors duration-300">Contact</a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-cyan-300 transition-colors duration-300 p-2 -m-2 touch-manipulation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-blue-900/20 animate-in slide-in-from-top duration-200">
          <nav className="px-4 py-4 space-y-1">
            <a 
              href="#home" 
              className="block text-white hover:text-cyan-300 active:text-cyan-400 py-3 px-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="block text-white hover:text-cyan-300 active:text-cyan-400 py-3 px-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#services" 
              className="block text-white hover:text-cyan-300 active:text-cyan-400 py-3 px-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#projects" 
              className="block text-white hover:text-cyan-300 active:text-cyan-400 py-3 px-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="block text-white hover:text-cyan-300 active:text-cyan-400 py-3 px-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300 touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}