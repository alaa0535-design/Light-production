import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { mediaAssets } from '../data/mediaAssets';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <img 
                src={mediaAssets.logo}
                alt="Lights Production Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-lg sm:text-2xl font-bold">LIGHTS PRODUCTION</h3>
                <p className="text-cyan-300 font-light text-sm sm:text-base">From A to Z – We Create Your Event</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Professional event production services including audio, video, photography, live streaming, and complete technical solutions for memorable experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-cyan-300">Contact Info</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base break-all">info@lightsproduction.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">Los Angeles, CA</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-cyan-300">Follow Us</h4>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 active:scale-95 transition-all duration-300 touch-manipulation"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 active:scale-95 transition-all duration-300 touch-manipulation"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 active:scale-95 transition-all duration-300 touch-manipulation"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 active:scale-95 transition-all duration-300 touch-manipulation"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </a>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4">
              Stay updated with our latest projects and behind-the-scenes content.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2024 Lights Production. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-3 sm:mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-cyan-300 active:text-cyan-400 text-xs sm:text-sm transition-colors duration-300 touch-manipulation">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-cyan-300 active:text-cyan-400 text-xs sm:text-sm transition-colors duration-300 touch-manipulation">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-cyan-300 active:text-cyan-400 text-xs sm:text-sm transition-colors duration-300 touch-manipulation">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}