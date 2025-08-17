import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/Modern Geometric Lights Production Logo1.png" 
                alt="Lights Production Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold">LIGHTS PRODUCTION</h3>
                <p className="text-cyan-300 font-light">From A to Z – We Create Your Event</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Professional event production services including audio, video, photography, live streaming, and complete technical solutions for memorable experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-300">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">info@lightsproduction.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">Los Angeles, CA</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-300">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-blue-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 hover:transform hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Stay updated with our latest projects and behind-the-scenes content.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Lights Production. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}