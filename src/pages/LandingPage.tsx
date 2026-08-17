import React from 'react';
import { Link } from 'react-router-dom';
import { Orbit, Activity, Shield, ChevronRight, Telescope, Sparkles, BookOpen } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-orange-500/30">
      
      {/* Background Grids & Orbits */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: `
               linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px'
           }}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full z-0 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full z-0 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Orbit className="w-6 h-6 text-orange-500" />
          <span className="text-sm font-bold tracking-[0.2em] text-white">SCIENTIS</span>
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-white/50">
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#research" className="hover:text-white transition-colors">RESEARCH</a>
          <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
        </nav>
        <div className="flex gap-4">
          <Link to="/login" className="text-xs font-mono tracking-widest text-white/50 hover:text-white transition-colors py-2 px-4 border border-transparent">
            LOGIN
          </Link>
          <Link to="/register" className="text-xs font-mono tracking-widest text-orange-500 hover:text-white transition-colors py-2 px-4 border border-orange-500/30 hover:border-orange-500/80 bg-orange-500/10">
            REGISTER
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4">
          
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 border border-orange-500/30 bg-orange-500/10 rounded-full text-orange-500 text-[10px] font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            Sistema en Línea
          </div>

          <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            OUR NEXT ACHIEVEMENT
            <br />
            <span className="font-bold tracking-[0.2em] block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              MARS
            </span>
          </h1>

          <p className="max-w-xl text-sm md:text-base text-white/50 font-mono mb-10 leading-relaxed">
            Plataforma de Observación y Enseñanza del Universo con renderizado WebGL relativista, 
            perfiles pedagógicos adaptativos y astronomía real Grado NASA/ESA.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/register?type=particular" className="group relative flex items-center justify-between w-64 p-4 border border-white/20 bg-black hover:border-white/50 transition-colors">
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono text-white/50 mb-1">PARTICULARES</span>
                <span className="text-sm tracking-widest">EXPLORE NOW</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </Link>

            <Link to="/register?type=colegio" className="group relative flex items-center justify-between w-64 p-4 border border-orange-500/30 bg-orange-500/5 hover:border-orange-500/80 transition-colors">
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono text-orange-500/70 mb-1">COLEGIOS</span>
                <span className="text-sm tracking-widest text-orange-500">TEACH NOW</span>
              </div>
              <ChevronRight className="w-4 h-4 text-orange-500/50 group-hover:text-orange-500 transition-colors" />
            </Link>
          </div>

          {/* Technical Data Bar */}
          <div className="mt-24 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 text-left">
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Avg. Distance from Sun</div>
              <div className="text-sm font-bold tracking-wider">142.000.000 Miles</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Diameter</div>
              <div className="text-sm font-bold tracking-wider">4.220 Miles</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Number of Moons</div>
              <div className="text-sm font-bold tracking-wider">2</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Gravity</div>
              <div className="text-sm font-bold tracking-wider">0.375 that of Earth</div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="research" className="py-24 px-8 md:px-24 bg-[#030303] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-xs font-mono text-orange-500 tracking-widest mb-4">RESEARCH</div>
            <h2 className="text-3xl font-light mb-16">We Live Our Dreams</h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="border-t border-red-900/50 pt-6">
                <Telescope className="w-8 h-8 text-red-500 mb-6" strokeWidth={1} />
                <h3 className="text-sm tracking-widest mb-4">ASTROPHYSICS</h3>
                <p className="text-xs font-mono text-white/50 leading-relaxed">
                  We work hard to be in line with the newest astrophysics research. 
                  It's extremely important because astrophysics is in the core of space exploration.
                </p>
              </div>
              <div className="border-t border-orange-900/50 pt-6">
                <Activity className="w-8 h-8 text-orange-500 mb-6" strokeWidth={1} />
                <h3 className="text-sm tracking-widest mb-4">COMPUTER SCIENCE</h3>
                <p className="text-xs font-mono text-white/50 leading-relaxed">
                  Programming, design, different calculations are crucial for our future base.
                  Robotics and physics are easier with the help of computer science.
                </p>
              </div>
              <div className="border-t border-white/20 pt-6">
                <BookOpen className="w-8 h-8 text-white/70 mb-6" strokeWidth={1} />
                <h3 className="text-sm tracking-widest mb-4">THEORETICAL PHYSICS</h3>
                <p className="text-xs font-mono text-white/50 leading-relaxed">
                  We need quality theories and approaches in physics to achieve our goals.
                  In our team work the best theoretical physicists.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <footer className="py-8 text-center border-t border-white/10">
        <p className="text-[10px] font-mono text-white/30 tracking-widest">
          © {new Date().getFullYear()} SCIENTIS MISSION. ALL SYSTEMS NOMINAL.
        </p>
      </footer>
    </div>
  );
};
