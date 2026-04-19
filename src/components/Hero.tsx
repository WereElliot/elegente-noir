import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero-container">
      <div className="hero-bg">
        <img 
          src="/assets/hero.png" 
          alt="Luxury background" 
          className="hero-img"
        />
        <div className="hero-gradient" />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
        <p style={{ 
          fontSize: '12px', 
          textTransform: 'uppercase', 
          letterSpacing: '0.5em', 
          marginBottom: '1.5rem', 
          color: 'var(--primary)' 
        }} className="animate-fade-in">
          EST. 2026 | NOIR EDITORIAL
        </p>
        <h1 style={{ 
          fontSize: 'clamp(4rem, 12vw, 10rem)', 
          lineHeight: '0.85', 
          letterSpacing: '-0.05em', 
          marginBottom: '2rem' 
        }} className="serif animate-fade-in delay-100">
          Beyond<br/>Luxury
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'rgba(255,255,255,0.5)', 
          maxWidth: '500px', 
          fontWeight: 300, 
          letterSpacing: '0.05em' 
        }} className="animate-fade-in delay-200">
          Redesigning the essence of time and fragrance through a lens of absolute minimalism.
        </p>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '3rem', 
        left: '5vw', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        fontSize: '10px', 
        textTransform: 'uppercase', 
        letterSpacing: '0.3em', 
        color: 'rgba(255,255,255,0.3)' 
      }}>
        <div style={{ width: '3rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
        Scroll to Explore
      </div>
    </section>
  );
};

export default Hero;
