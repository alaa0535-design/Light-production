import React from 'react';
import { Users, Award, Wrench, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: Users,
    title: 'Professional Team',
    description: 'Experienced professionals with years of expertise in event production and technical execution.'
  },
  {
    icon: Award,
    title: 'Full Event Coverage',
    description: 'Complete end-to-end services from planning to execution, ensuring every detail is perfectly managed.'
  },
  {
    icon: Wrench,
    title: 'Modern Equipment',
    description: 'State-of-the-art technology and equipment maintained to the highest industry standards.'
  },
  {
    icon: Lightbulb,
    title: 'Creative Excellence',
    description: 'Innovative solutions and creative approaches to make your event truly memorable and unique.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine technical expertise, creative vision, and professional excellence to deliver exceptional event experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={index}
                className="group text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-blue-400 group-hover:text-cyan-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
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