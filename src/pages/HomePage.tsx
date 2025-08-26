import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function HomePage() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-900" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </div>
  );
}