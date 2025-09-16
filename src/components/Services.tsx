import React from 'react';
import { Volume2, Video, Camera, Radio, Lightbulb, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Volume2,
      title: t('audioSolutions'),
      description: t('audioDescription'),
      features: t('audioFeatures')
    },
    {
      icon: Lightbulb,
      title: t('lightingLedSolutions'),
      description: t('lightingLedDescription'),
      features: t('lightingLedFeatures')
    },
    {
      icon: Video,
      title: t('videoProduction'),
      description: t('videoDescription'),
      features: t('videoFeatures')
    },
    {
      icon: Camera,
      title: t('photography'),
      description: t('photographyDescription'),
      features: t('photographyFeatures')
    },
    {
      icon: Radio,
      title: t('liveStreaming'),
      description: t('liveStreamingDescription'),
      features: t('liveStreamingFeatures')
    },
    {
      icon: Award,
      title: t('fullEventManagement'),
      description: t('fullEventManagementDescription'),
      features: t('fullEventManagementFeatures')
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-800 to-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {t('servicesTitle').split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('servicesTitle').split(' ').slice(1).join(' ') || 'Services'}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            {t('servicesSubtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8 hover:border-cyan-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 touch-manipulation"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {Array.isArray(service.features) && service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-400">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full ${isRTL ? 'ml-3' : 'mr-3'}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}