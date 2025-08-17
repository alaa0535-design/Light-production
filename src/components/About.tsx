import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
              {t('aboutTitle').split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('aboutTitle').split(' ').slice(1).join(' ') || 'Us'}</span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              <p>
                {t('aboutText1')}
              </p>
              <p>
                {t('aboutText2')}
              </p>
              <p>
                {t('aboutText3')}
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-blue-500/20">
              <div className="h-full flex flex-col justify-center space-y-6 sm:space-y-8">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl arabic-numbers">10+</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm sm:text-base">{t('yearsExperience')}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{t('inEventProduction')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl arabic-numbers">500+</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm sm:text-base">{t('eventsProduced')}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{t('successfullyDelivered')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl arabic-numbers">24/7</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm sm:text-base">{t('supportAvailable')}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{t('professionalTeam')}</p>
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