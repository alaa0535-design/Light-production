import React from 'react';
import { Users, Award, Wrench, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhyChooseUs() {
  const { t, isRTL } = useLanguage();

  const reasons = [
    {
      icon: Users,
      title: t('professionalTeamTitle'),
      description: t('professionalTeamDescription')
    },
    {
      icon: Award,
      title: t('fullEventCoverage'),
      description: t('fullEventCoverageDescription')
    },
    {
      icon: Wrench,
      title: t('modernEquipment'),
      description: t('modernEquipmentDescription')
    },
    {
      icon: Lightbulb,
      title: t('creativeExcellence'),
      description: t('creativeExcellenceDescription')
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t('whyChooseUsTitle').split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('whyChooseUsTitle').split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            {t('whyChooseUsSubtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={index}
                className="group text-center hover:transform hover:scale-105 transition-all duration-300 touch-manipulation"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 group-hover:text-cyan-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}