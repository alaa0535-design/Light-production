import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="/Modern Geometric Lights Production Logo1.png" 
              alt="Lights Production Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-white font-bold text-xl">LIGHTS PRODUCTION</span>
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
            className="md:hidden text-white hover:text-cyan-300 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-blue-900/20">
          <nav className="px-4 py-4 space-y-2">
            <a href="#home" className="block text-white hover:text-cyan-300 py-2 transition-colors duration-300">Home</a>
            <a href="#about" className="block text-white hover:text-cyan-300 py-2 transition-colors duration-300">About</a>
            <a href="#services" className="block text-white hover:text-cyan-300 py-2 transition-colors duration-300">Services</a>
            <a href="#projects" className="block text-white hover:text-cyan-300 py-2 transition-colors duration-300">Projects</a>
            <a href="#contact" className="block text-white hover:text-cyan-300 py-2 transition-colors duration-300">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}