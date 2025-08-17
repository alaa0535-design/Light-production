import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Globe className="w-4 h-4 text-gray-400" />
      <div className="flex bg-slate-800/50 rounded-lg p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm rounded-md transition-all duration-300 touch-manipulation ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-3 py-1 text-sm rounded-md transition-all duration-300 touch-manipulation ${
            language === 'ar'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          عربي
        </button>
      </div>
    </div>
  );
}