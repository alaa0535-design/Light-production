import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

export default function ProjectsPage() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="pt-16">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}