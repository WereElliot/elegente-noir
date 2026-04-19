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
        <div className="hero-gradient-overlay" />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
        <p style={{ 
          fontSize: '11px', 
          textTransform: 'uppercase', 
          letterSpacing: '0.6em', 
          marginBottom: '2rem', 
          color: 'var(--primary)',
          fontWeight: 500
        }} className="animate-fade-in">
          EST. 2026 | THE ARTIFACTS OF TIME
        </p>
        <h1 style={{ 
          fontSize: 'clamp(5rem, 15vw, 13rem)', 
          lineHeight: '0.85', 
          letterSpacing: '-0.04em', 
          marginBottom: '3rem',
          color: 'var(--text)'
        }} className="serif animate-fade-in delay-100">
          Pure<br/>Elegance
        </h1>
        <p style={{ 
          fontSize: '1.4rem', 
          color: 'var(--text-muted)', 
          maxWidth: '550px', 
          fontWeight: 300, 
          letterSpacing: '0.02em',
          lineHeight: '1.6'
        }} className="animate-fade-in delay-200">
          A masterclass in restraint. We curate objects that transcend trends, focusing on the raw beauty of form and function.
        </p>
        
        <button 
          onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          className="explore-btn animate-fade-in delay-300"
        >
          Explore Curation
        </button>
      </div>

      <style>{`
        .explore-btn {
          margin-top: 4rem;
          padding: 1.5rem 4rem;
          border: 1px solid var(--text);
          color: var(--text);
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.3em;
          font-weight: 500;
          transition: all 0.6s ease;
        }
        .explore-btn:hover {
          background-color: var(--text);
          color: white;
        }
      `}</style>
    </section>
  );
};

export default Hero;
