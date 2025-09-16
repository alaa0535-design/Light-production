import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
              {t('aboutTitle').split(' ')[0]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {t('aboutTitle').split(' ').slice(1).join(' ') || 'Us'}
              </span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              <p>{t('aboutText1')}</p>
              <p>{t('aboutText2')}</p>
              <p>{t('aboutText3')}</p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl p-6 sm:p-8 py-8 backdrop-blur-sm border border-blue-500/20 hover:shadow-2xl hover:shadow-cyan-500/25 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300">
              <div className="h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 sm:gap-12">
                {/* Box 1: Years of Experience */}
                <div className="flex items-start justify-start space-x-4 rtl:space-x-reverse h-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-extrabold text-xl sm:text-2xl lg:text-3xl arabic-numbers">15+</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-base sm:text-lg">{t('yearsExperience')}</p>
                    <p className="text-gray-400 text-sm sm:text-base">{t('inEventProduction')}</p>
                  </div>
                </div>

                {/* Box 2: Events Produced */}
                <div className="flex items-start justify-start space-x-4 rtl:space-x-reverse h-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-extrabold text-xl sm:text-2xl lg:text-3xl arabic-numbers">500+</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-base sm:text-lg">{t('eventsProduced')}</p>
                    <p className="text-gray-400 text-sm sm:text-base">{t('successfullyDelivered')}</p>
                  </div>
                </div>

                {/* Box 3: 24/7 Support */}
                <div className="flex items-start justify-start space-x-4 rtl:space-x-reverse h-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-extrabold text-xl sm:text-2xl lg:text-3xl arabic-numbers">24/7</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-base sm:text-lg">{t('supportAvailable')}</p>
                    <p className="text-gray-400 text-sm sm:text-base">{t('professionalTeam')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
