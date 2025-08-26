import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function CallToAction() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          {t('ctaTitle')}
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
          {t('ctaSubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 active:scale-95 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl touch-manipulation">
            {t('getFreeConsultation')}
          </button>
          <Link 
            to="/projects"
            className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-blue-700 active:scale-95 transition-all duration-300 hover:transform hover:scale-105 touch-manipulation inline-flex items-center justify-center"
          >
            {t('viewPortfolio')}
          </Link>
        </div>
      </div>
    </section>
  );
}