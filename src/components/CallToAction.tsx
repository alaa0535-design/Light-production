import React from 'react';

export default function CallToAction() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Let's Make Your Next Event Memorable
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Ready to create an unforgettable experience? Get in touch with our team to discuss your event production needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 active:scale-95 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl touch-manipulation">
            Get Free Consultation
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-blue-700 active:scale-95 transition-all duration-300 hover:transform hover:scale-105 touch-manipulation">
            View Our Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}