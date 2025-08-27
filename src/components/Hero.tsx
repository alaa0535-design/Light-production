import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { mediaAssets } from '../data/mediaAssets';

export default function Hero() {
  const { t, isRTL } = useLanguage();

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
        
        {/* Audience silhouette */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24">
          {/* Simplified audience silhouette */}
          <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 sm:rtl:space-x-reverse">
          <img 
            src={mediaAssets.logo}
            alt="Lights Production Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white tracking-wider" style={{ letterSpacing: isRTL ? '0.1em' : '0.1em' }}>
              {t('companyName').split(' ')[0]}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-cyan-300 font-light tracking-widest" style={{ letterSpacing: isRTL ? '0.2em' : '0.2em' }}>
              {t('companyName').split(' ')[1] || 'PRODUCTION'}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 font-light max-w-2xl mx-auto px-4">
          {t('tagline')}
        </p>

        {/* CTA Button */}
        <Link 
          to="/projects"
          className="group inline-flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 active:scale-95 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 touch-manipulation"
        >
          <span className="flex items-center space-x-2 rtl:space-x-reverse">
            <span>{t('seeProjects')}</span>
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
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