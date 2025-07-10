import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.webp';

// SVG for quantum annealer illustration
const QuantumAnnealerSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FAB12F" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
    </defs>
    <g transform="translate(150, 150)">
      {/* Central quantum processor */}
      <circle cx="0" cy="0" r="40" fill="#0A2463" stroke="#FAB12F" strokeWidth="3" />
      <circle cx="0" cy="0" r="30" fill="#0A2463" stroke="#FAB12F" strokeWidth="2" />
      <circle cx="0" cy="0" r="20" fill="#0A2463" stroke="#FAB12F" strokeWidth="1" />
      <circle cx="0" cy="0" r="10" fill="#FAB12F" />
      
      {/* Quantum bits (qubits) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x = 80 * Math.cos(angle);
        const y = 80 * Math.sin(angle);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="12" fill="#0A2463" stroke="#FAB12F" strokeWidth="2" />
            <circle cx={x} cy={y} r="6" fill="#FAB12F" className="animate-pulse" />
            <line 
              x1="0" 
              y1="0" 
              x2={x * 0.8} 
              y2={y * 0.8} 
              stroke="url(#quantumGradient)" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
              className="animate-pulse"
            />
          </g>
        );
      })}
      
      {/* Quantum entanglement connections */}
      {Array.from({ length: 12 }).map((_, i) => {
        const startAngle = (i * Math.PI) / 6;
        const endAngle = ((i + 3) * Math.PI) / 6;
        const x1 = 80 * Math.cos(startAngle);
        const y1 = 80 * Math.sin(startAngle);
        const x2 = 80 * Math.cos(endAngle);
        const y2 = 80 * Math.sin(endAngle);
        return (
          <path 
            key={i} 
            d={`M ${x1} ${y1} Q 0 0 ${x2} ${y2}`} 
            fill="none" 
            stroke="#FAB12F" 
            strokeWidth="1" 
            strokeOpacity="0.5" 
            strokeDasharray="3,3" 
          />
        );
      })}
      
      {/* Animated particles */}
      {Array.from({ length: 5 }).map((_, i) => {
        const delay = i * 0.5;
        return (
          <circle 
            key={i} 
            cx="0" 
            cy="0" 
            r="50" 
            fill="none" 
            stroke="#FAB12F" 
            strokeWidth="1" 
            opacity="0.7"
            style={{
              animation: `ripple 3s infinite ${delay}s`,
              transformOrigin: 'center'
            }}
          />
        );
      })}
    </g>
  </svg>
);

// SVG for solar grid illustration
const SolarGridSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="solarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FAB12F" />
        <stop offset="100%" stopColor="#FF6B35" />
      </linearGradient>
      <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
        <rect width="60" height="60" fill="#0A2463" />
        <rect width="30" height="30" fill="#FAB12F" />
      </pattern>
    </defs>
    
    {/* Background terrain */}
    <path d="M 0 220 Q 75 180 150 200 Q 225 220 300 190 L 300 300 L 0 300 Z" fill="#0A2463" />
    
    {/* Solar panels */}
    {Array.from({ length: 3 }).map((_, row) => (
      Array.from({ length: 4 }).map((_, col) => {
        const x = 40 + col * 70;
        const y = 100 + row * 40;
        return (
          <g key={`${row}-${col}`} transform={`translate(${x}, ${y}) rotate(-15)`}>
            <rect x="-25" y="-20" width="50" height="40" fill="#0A2463" stroke="#FAB12F" strokeWidth="2" />
            <rect x="-20" y="-15" width="40" height="30" fill="url(#solarGradient)" />
            <line x1="-20" y1="-5" x2="20" y2="-5" stroke="#0A2463" strokeWidth="1" />
            <line x1="-20" y1="5" x2="20" y2="5" stroke="#0A2463" strokeWidth="1" />
            <line x1="-10" y1="-15" x2="-10" y2="15" stroke="#0A2463" strokeWidth="1" />
            <line x1="0" y1="-15" x2="0" y2="15" stroke="#0A2463" strokeWidth="1" />
            <line x1="10" y1="-15" x2="10" y2="15" stroke="#0A2463" strokeWidth="1" />
            <line x1="-25" y1="20" x2="-15" y2="30" stroke="#0A2463" strokeWidth="2" />
            <line x1="25" y1="20" x2="15" y2="30" stroke="#0A2463" strokeWidth="2" />
          </g>
        );
      })
    ))}
    
    {/* Power lines */}
    <path d="M 150 250 L 150 180 M 140 180 L 160 180" stroke="#FAB12F" strokeWidth="2" />
    <path d="M 150 180 L 50 150 M 150 180 L 250 150" stroke="#FAB12F" strokeWidth="2" strokeDasharray="5,5" />
    
    {/* Houses/buildings */}
    <g transform="translate(50, 150)">
      <rect x="-15" y="-20" width="30" height="20" fill="#0A2463" stroke="#FAB12F" strokeWidth="1" />
      <polygon points="-15,-20 15,-20 0,-35" fill="#0A2463" stroke="#FAB12F" strokeWidth="1" />
      <rect x="-5" y="-10" width="10" height="10" fill="#FAB12F" opacity="0.7" />
    </g>
    
    <g transform="translate(250, 150)">
      <rect x="-20" y="-30" width="40" height="30" fill="#0A2463" stroke="#FAB12F" strokeWidth="1" />
      <rect x="-15" y="-25" width="10" height="10" fill="#FAB12F" opacity="0.7" />
      <rect x="5" y="-25" width="10" height="10" fill="#FAB12F" opacity="0.7" />
      <rect x="-15" y="-10" width="10" height="10" fill="#FAB12F" opacity="0.7" />
      <rect x="5" y="-10" width="10" height="10" fill="#FAB12F" opacity="0.7" />
    </g>
    
    {/* Sun rays */}
    <g transform="translate(270, 30)">
      <circle cx="0" cy="0" r="15" fill="url(#solarGradient)" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x = 25 * Math.cos(angle);
        const y = 25 * Math.sin(angle);
        return (
          <line 
            key={i} 
            x1={15 * Math.cos(angle)} 
            y1={15 * Math.sin(angle)} 
            x2={x} 
            y2={y} 
            stroke="#FAB12F" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        );
      })}
    </g>
    
    {/* Energy flow indicators */}
    {Array.from({ length: 5 }).map((_, i) => {
      const delay = i * 0.3;
      return (
        <circle 
          key={i} 
          cx="150" 
          cy="180" 
          r="5" 
          fill="#FAB12F"
          opacity="0.7"
          style={{
            animation: `energyPulse 2s infinite ${delay}s`,
          }}
        />
      );
    })}
  </svg>
);

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 opacity-90"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FAB12F] to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-[#FAB12F]"></div>
          <MovingDots />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <img src={logo} alt="QEnergic Logo" className="w-80 h-auto mb-8 animate-float" />
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FAB12F] to-orange-500 animate-text-shimmer" style={{backgroundSize: '200% auto'}}>
                Smarter Grids. Brighter Lives.
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-white mb-8">
              Powered by <span className="font-semibold text-[#FAB12F] animate-bounce-gentle inline-block">Quantum</span>
            </p>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                At QEnergic, we're transforming the future of energy access in Africa through the power of Quantum Computing.
              </p>
              
              <div className="mt-8">
                <Link to="/optimizer" className="inline-block bg-gradient-to-r from-[#FAB12F] to-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 relative overflow-hidden group">
                  Explore Our Platform
                  <span className="absolute -inset-x-1 bottom-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="text-[#FAB12F]">Intelligent Platform</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Harnesses cutting-edge quantum optimization to design cost-effective, high-impact microgrid deployments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#FAB12F]/10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-[#0A2463] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FAB12F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Maximize Clean Energy Output</h3>
              <p className="text-gray-300 text-center">
                Optimize solar panel placement and configuration to generate maximum power with minimal resources.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#FAB12F]/10">
              <div className="w-16 h-16 bg-[#0A2463] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FAB12F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Serve More People</h3>
              <p className="text-gray-300 text-center">
                Reach more communities with fewer resources through intelligent distribution and placement strategies.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#FAB12F]/10">
              <div className="w-16 h-16 bg-[#0A2463] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FAB12F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">Strategic Placement</h3>
              <p className="text-gray-300 text-center">
                Place microgrids where they matter most, maximizing impact for underserved communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powered by <span className="text-[#FAB12F]">Quantum Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines AI-driven insights, solar potential analysis, and quantum-enhanced planning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700 h-80">
              <div className="h-full w-full">
                <QuantumAnnealerSVG />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-[#FAB12F] mb-4">Quantum Annealing Optimization</h3>
              <p className="text-gray-300 mb-6">
                Our quantum algorithms solve complex optimization problems that would take traditional computers years to process. By harnessing quantum mechanics, we can evaluate millions of possible microgrid configurations simultaneously.
              </p>
              <ul className="space-y-3">
                {[
                  "Faster computation for complex energy distribution problems",
                  "Optimized resource allocation across vast geographical areas",
                  "Dynamic adaptation to changing energy needs and conditions"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FAB12F] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-[#FAB12F] mb-4">Solar Microgrid Solutions</h3>
              <p className="text-gray-300 mb-6">
                Our intelligent platform designs solar microgrids that maximize energy output while minimizing costs. We analyze geographical data, solar potential, population density, and infrastructure requirements to create the perfect solution.
              </p>
              <ul className="space-y-3">
                {[
                  "Tailored solutions for underserved and off-grid communities",
                  "Sustainable energy access for schools, clinics, and farms",
                  "Data-backed confidence for governments, NGOs, and energy providers"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FAB12F] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700 h-80 order-1 md:order-2">
              <div className="relative w-full h-64 md:h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin-slow">
                    <QuantumAnnealerSVG />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#FAB12F]/20 rounded-full animate-pulse-slow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0A2463] to-indigo-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join us in lighting up Africa
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            One optimized quantum grid at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/optimizer" className="inline-block bg-gradient-to-r from-[#FAB12F] to-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 relative overflow-hidden group">
              Try Our Platform
            </Link>
            <Link to="/contact" className="inline-block bg-transparent border-2 border-[#FAB12F] text-[#FAB12F] font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 hover:bg-[#FAB12F]/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src={logo} alt="QEnergic Logo" className="h-12 w-auto" />
              <p className="text-gray-400 mt-2">Smarter Grids. Brighter Lives.</p>
            </div>
            <div className="flex space-x-6">
              {[
                "About", "Services", "Projects", "Blog", "Contact"
              ].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-[#FAB12F] transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} QEnergic. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {[
                "Privacy Policy", "Terms of Service", "Cookie Policy"
              ].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-[#FAB12F] text-sm transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Animation keyframes - add to your CSS */}
      <style jsx>{`
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes energyPulse {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes moveDot {
          0% { transform: translate(0, 0); }
          25% { transform: translate(100px, 50px); }
          50% { transform: translate(50px, 100px); }
          75% { transform: translate(-50px, 50px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}

// Moving dots background component
const MovingDots = () => {
  const dots = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4, // Increased from (4+2) to (8+4) for larger dots
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-40">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-[#FAB12F]"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            animation: `moveDot ${dot.duration}s infinite linear ${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
};