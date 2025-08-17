import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Us</span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              <p>
                Lights Production is a premier event production company specializing in creating unforgettable experiences through cutting-edge technology and creative excellence.
              </p>
              <p>
                Our comprehensive services include professional audio systems, multi-camera video production, stunning photography, live streaming solutions, advanced media server management, and complete post-production editing services.
              </p>
              <p>
                From intimate corporate gatherings to large-scale concerts and festivals, we bring your vision to life with precision, creativity, and unmatched technical expertise.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-blue-500/20">
              <div className="h-full flex flex-col justify-center space-y-6 sm:space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl">10+</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm sm:text-base">Years Experience</p>
                    <p className="text-gray-400 text-xs sm:text-sm">In Event Production</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl">500+</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm sm:text-base">Events Produced</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Successfully Delivered</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl">24/7</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm sm:text-base">Support Available</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Professional Team</p>
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