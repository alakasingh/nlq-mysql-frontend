"use client";
import React from 'react';
import { ArrowRight, Cpu, Sparkles, Database, Shield, Zap, Terminal } from "lucide-react";
import { ReactNode } from "react";
import Navbar from "@/components/nav";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
  borderColor: string;
}



export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #020617, #0f172a, #020617)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient orbs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '384px',
          height: '384px',
          background: 'rgba(6, 182, 212, 0.2)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: '25%',
          width: '384px',
          height: '384px',
          background: 'rgba(139, 92, 246, 0.2)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 6s ease-in-out infinite',
          animationDelay: '1s'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '384px',
          height: '384px',
          background: 'rgba(217, 70, 239, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 5s ease-in-out infinite',
          animationDelay: '2s'
        }} />
      </div>

      {/* Grid overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        pointerEvents: 'none',
        opacity: 0.2,
        backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade { animation: fadeInUp 1s ease-out; }
        .animate-fade-1 { animation: fadeInUp 1s ease-out 0.2s both; }
        .animate-fade-2 { animation: fadeInUp 1s ease-out 0.5s both; }
        .animate-fade-3 { animation: fadeInUp 1s ease-out 0.7s both; }
      `}</style>

      {/* Navigation */}
      <Navbar />
   

      {/* Main Content */}
      <main style={{
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        
        padding: '10rem 2rem 8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        
      }}>
        {/* Badge */}
        <div className="animate-fade" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          marginBottom: '2rem',
          borderRadius: '9999px',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          background: 'rgba(6, 182, 212, 0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 10px 40px rgba(6, 182, 212, 0.2)'
        }}>
          <Sparkles size={14} style={{ color: '#22d3ee' }} fill="currentColor" />
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#67e8f9'
          }}>
            NEXT GEN DATA ANALYSIS
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="animate-fade" style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          marginBottom: '2rem',
          maxWidth: '1200px',
          lineHeight: 1.1
        }}>
          Talk to your{' '}
          <span style={{
            position: 'relative',
            display: 'inline-block'
          }}>
            <span style={{
              background: 'linear-gradient(to right, #22d3ee, #a78bfa, #e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              MySQL
            </span>
          </span>
          {' '}Data.
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-1" style={{
          fontSize: '1.25rem',
          color: '#94a3b8',
          marginBottom: '3rem',
          maxWidth: '672px',
          lineHeight: 1.75
        }}>
          The first AI-native database interface that translates your human questions into complex SQL, instantly.
          No more manual queries, just answers.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-2" style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          marginBottom: '6rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <a href="/dashboard" style={{
            position: 'relative',
            padding: '1rem 3rem',
            borderRadius: '9999px',
            background: 'linear-gradient(to right, #06b6d4, #7c3aed)',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.125rem',
            boxShadow: '0 20px 60px rgba(6, 182, 212, 0.5)',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 70px rgba(6, 182, 212, 0.7)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(6, 182, 212, 0.5)';
          }}>
            <span>Launch Dashboard</span>
            <ArrowRight size={20} />
          </a>
          <button style={{
            padding: '1rem 3rem',
            borderRadius: '9999px',
            border: '2px solid #334155',
            background: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(12px)',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.125rem',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = '#334155';
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
          }}>
            <span>View Live Demo</span>
            <Terminal size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="animate-fade-3 product" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          width: '100%'
        }}>
          <FeatureCard
            icon={<Zap size={32} style={{ color: '#facc15' }} />}
            title="Instant Results"
            description="Complex SQL generation in milliseconds using tuned LLM models."
            gradient="linear-gradient(to bottom right, rgba(234, 179, 8, 0.1), rgba(249, 115, 22, 0.1))"
            borderColor="rgba(234, 179, 8, 0.2)"
          />
          <FeatureCard
            icon={<Shield size={32} style={{ color: '#34d399' }} />}
            title="Enterprise Secure"
            description="Your credentials stay local. We only process schema and questions."
            gradient="linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))"
            borderColor="rgba(16, 185, 129, 0.2)"
          />
          <FeatureCard
            icon={<Database size={32} style={{ color: '#22d3ee' }} />}
            title="Full Schema Support"
            description="Automatic relationship detection and comprehensive schema exploration."
            gradient="linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))"
            borderColor="rgba(6, 182, 212, 0.2)"
          />
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        padding: '2rem',
        borderTop: '1px solid rgba(51, 65, 85, 0.5)',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.05em'
      }}>
        &copy; 2026 NLQ MySQL AI. Proudly built for the future of data.
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  borderColor,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
     className=''
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '2rem',
        borderRadius: '1rem',
        border: `1px solid ${borderColor}`,
        background: gradient,
        backdropFilter: 'blur(12px)',
        transition: 'transform 0.3s',
        textAlign: 'left',
        overflow: 'hidden',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
      }}
    > 
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.03), transparent)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s'
      }} />
      <div style={{ position: 'relative' }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          width: '4rem',
          height: '4rem',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          transition: 'transform 0.3s',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'scale(1.1) rotate(3deg)' : 'scale(1) rotate(0deg)'
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'white',
          marginBottom: '0.75rem',
          letterSpacing: '-0.025em'
        }}>
          {title}
        </h3>
        <p style={{
          color: '#94a3b8',
          fontSize: '0.875rem',
          lineHeight: 1.75
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}