import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Us</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
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
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20">
              <div className="h-full flex flex-col justify-center space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">10+</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Years Experience</p>
                    <p className="text-gray-400">In Event Production</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">500+</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Events Produced</p>
                    <p className="text-gray-400">Successfully Delivered</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">24/7</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Support Available</p>
                    <p className="text-gray-400">Professional Team</p>
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