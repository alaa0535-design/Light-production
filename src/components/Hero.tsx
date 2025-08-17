import React from 'react';
import { mediaAssets } from '../data/mediaAssets';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with lighting effects */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${mediaAssets.heroBanner})` }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-slate-900/70"></div>
        
        {/* Stage lights effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/6 w-32 h-full bg-gradient-to-b from-blue-400/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          <div className="absolute top-0 left-2/6 w-32 h-full bg-gradient-to-b from-cyan-300/15 to-transparent transform -skew-x-12 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-0 left-3/6 w-32 h-full bg-gradient-to-b from-blue-300/18 to-transparent transform -skew-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 left-4/6 w-32 h-full bg-gradient-to-b from-cyan-400/15 to-transparent transform -skew-x-12 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-0 left-5/6 w-32 h-full bg-gradient-to-b from-blue-400/20 to-transparent transform -skew-x-12 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        </div>
        
        {/* Audience silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24">
          {/* Simplified audience silhouette */}
          <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
          <img 
            src={mediaAssets.logo}
            alt="Lights Production Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-wider">
              LIGHTS
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-cyan-300 font-light tracking-widest">
              PRODUCTION
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 font-light max-w-2xl mx-auto px-4">
          From A to Z – We Create Your Event
        </p>

        {/* CTA Button */}
        <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 active:scale-95 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 touch-manipulation">
          <span className="flex items-center space-x-2">
            <span>See Our Projects</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}