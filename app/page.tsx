'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useMediaQuery from '../hooks/useMediaQuery';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const homeStyles = {
  container: {
    padding: '12px',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1.5rem 1rem',
    marginBottom: '1.5rem',
    borderRadius: 'var(--app-border-radius)',
    background: 'linear-gradient(135deg, var(--theme-blue), var(--theme-purple))',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '0.75rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
  },
  subheading: {
    fontSize: '1rem',
    marginBottom: '1.25rem',
    opacity: 0.9,
    textAlign: 'center' as const,
  },
  buttonContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  primaryButton: {
    backgroundColor: 'white',
    color: 'var(--theme-blue)',
    border: 'none',
    borderRadius: '50px',
    padding: '0.75rem 1.5rem',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '50px',
    padding: '0.75rem 1.5rem',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  featuresSection: {
    marginBottom: '2rem',
  },
  featuresHeading: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    paddingLeft: '0.5rem',
    fontWeight: 'bold',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '1.25rem 1rem',
    backgroundColor: 'var(--background)',
    borderRadius: 'var(--app-border-radius)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid var(--gray-200)',
  },
  featureIconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
    fontSize: '1.5rem',
  },
  featureTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textAlign: 'center' as const,
  },
  featureDescription: {
    fontSize: '0.8rem',
    color: 'var(--gray-600)',
    textAlign: 'center' as const,
  }
};

export default function Home() {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  
  const features: FeatureCard[] = [
    {
      id: 'mood-tracking',
      title: 'Mood Logging',
      description: 'Track daily mood and stress levels',
      icon: '📝',
      color: 'rgba(94, 106, 210, 0.1)'
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      description: 'Get personalized wellness suggestions',
      icon: '🧠',
      color: 'rgba(255, 90, 95, 0.1)'
    },
    {
      id: 'counselor',
      title: 'Counselor Chat',
      description: 'Connect with wellness professionals',
      icon: '👨‍⚕️',
      color: 'rgba(0, 201, 167, 0.1)'
    },
    {
      id: 'challenges',
      title: 'Challenges',
      description: 'Complete wellness activities and earn points',
      icon: '🏆',
      color: 'rgba(255, 199, 95, 0.1)'
    },
    {
      id: 'notifications',
      title: 'Smart Reminders',
      description: 'Get timely reminders for wellness',
      icon: '🔔',
      color: 'rgba(151, 71, 255, 0.1)'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View your mental wellness trends',
      icon: '📊',
      color: 'rgba(94, 106, 210, 0.1)'
    }
  ];

  useEffect(() => {
    // Staggered animation for feature cards
    const animationTimeout = setTimeout(() => {
      const items = [];
      const totalItems = 6;
      
      for (let i = 0; i < totalItems; i++) {
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, i]);
        }, i * 150);
      }
      
      return () => {
        clearTimeout(animationTimeout);
      };
    }, 300);
    
    return () => clearTimeout(animationTimeout);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/dashboard';
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Determine grid columns based on screen size
  const featureGridColumns = isDesktop 
    ? 'repeat(3, 1fr)' 
    : isTablet 
    ? 'repeat(2, 1fr)' 
    : 'repeat(2, 1fr)';

  return (
    <div style={homeStyles.container}>
      <section style={{
        ...homeStyles.hero,
        padding: isTablet ? '3rem 2rem' : '1.5rem 1rem'
      }}>
        <h1 style={{
          ...homeStyles.heading,
          fontSize: isTablet ? '2.2rem' : '1.8rem'
        }}>Campus Wellness</h1>
        <h2 style={{
          ...homeStyles.subheading,
          fontSize: isTablet ? '1.2rem' : '1rem',
          maxWidth: isTablet ? '80%' : '100%'
        }}>Your AI-powered mental wellness companion</h2>
        <div style={homeStyles.buttonContainer}>
          <button 
            style={homeStyles.primaryButton}
            onClick={handleGetStarted}
            className="tap-effect"
          >
            Get Started
          </button>
          <button 
            style={homeStyles.secondaryButton}
            onClick={handleLearnMore}
            className="tap-effect"
          >
            Learn More
          </button>
        </div>
      </section>

      <section id="features" style={{
        ...homeStyles.featuresSection,
        padding: isTablet ? '0 1.5rem' : '0'
      }}>
        <h2 style={homeStyles.featuresHeading}>Key Features</h2>
        <div style={{
          ...homeStyles.featureGrid,
          gridTemplateColumns: featureGridColumns,
          gap: isTablet ? '1.25rem' : '0.75rem'
        }}>
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              style={homeStyles.featureCard}
              className={`feature-card ${animatedItems.includes(index) ? 'animate-in' : ''}`}
            >
              <div 
                style={{
                  ...homeStyles.featureIconContainer,
                  backgroundColor: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 style={homeStyles.featureTitle}>{feature.title}</h3>
              <p style={homeStyles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .home-container {
          padding-bottom: 2rem;
        }
        
        .hero-section {
          padding: 2rem 1rem 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: linear-gradient(180deg, var(--background) 0%, var(--card-background) 100%);
          border-bottom: 1px solid var(--gray-200);
          margin-bottom: 2rem;
          transition: background var(--transition-normal);
        }
        
        .hero-content {
          max-width: 540px;
        }
        
        .hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .accent-text {
          color: var(--accent);
          background: linear-gradient(90deg, var(--theme-accent) 0%, var(--theme-accent-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-description {
          font-size: 1.125rem;
          color: var(--gray-600);
          margin-bottom: 2rem;
          line-height: 1.6;
          transition: color var(--transition-normal);
        }
        
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        
        .cta-button {
          background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 12px rgba(79, 124, 172, 0.25);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(79, 124, 172, 0.35);
          text-decoration: none;
        }
        
        .secondary-button {
          background-color: var(--gray-100);
          color: var(--foreground);
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 1px solid var(--gray-300);
        }
        
        .secondary-button:hover {
          background-color: var(--gray-200);
          text-decoration: none;
        }
        
        .section-title {
          font-size: 1.75rem;
          text-align: center;
          margin-bottom: 2rem;
          color: var(--foreground);
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          padding: 0 1rem;
        }
        
        .feature-card {
          background-color: var(--card-background);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s ease, box-shadow 0.3s ease, 
                     opacity 0.5s ease, background-color var(--transition-normal), 
                     border-color var(--transition-normal);
          opacity: 0;
          transform: translateY(20px);
        }
        
        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .feature-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          margin-bottom: 1rem;
          transition: transform 0.2s ease;
        }
        
        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--foreground);
        }
        
        .feature-description {
          font-size: 0.95rem;
          color: var(--gray-600);
          line-height: 1.5;
          margin-bottom: 0;
        }
        
        /* Responsive styles */
        @media (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .hero-title {
            font-size: 3rem;
          }
        }
        
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .hero-section {
            padding: 3rem 1rem 4rem;
          }
          
          .hero-title {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
}
