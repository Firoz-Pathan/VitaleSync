'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  timeline: 'Current' | 'Coming Soon' | 'Future';
  progress: number; // 0-100
  details: string[];
}

const RoadmapPage: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  
  const features: Feature[] = [
    {
      id: 1,
      title: "Emotional Journey Timelapse",
      description: "Visualize your emotional patterns over time with interactive timelapses",
      icon: "📈",
      timeline: "Coming Soon",
      progress: 75,
      details: [
        "Visual representation of mood evolution over months and years",
        "Interactive timeline with emotional milestones",
        "Ability to identify patterns and emotional triggers",
        "Share and export your emotional journey insights"
      ]
    },
    {
      id: 2,
      title: "Biometric Integration",
      description: "Connect wearables to correlate physical metrics with emotional states",
      icon: "❤️",
      timeline: "Coming Soon",
      progress: 60,
      details: [
        "Integration with popular fitness trackers and smartwatches",
        "Heart rate variability analysis for stress detection",
        "Sleep quality correlation with mood fluctuations",
        "Activity level impact on emotional wellbeing"
      ]
    },
    {
      id: 3,
      title: "Voice Mood Analysis",
      description: "Record voice notes for AI analysis of emotional undertones",
      icon: "🎤",
      timeline: "Future",
      progress: 30,
      details: [
        "Advanced voice analysis algorithms to detect emotional states",
        "Identification of subtle changes in voice patterns",
        "Keyword and linguistic pattern recognition",
        "Private, encrypted voice journaling feature"
      ]
    },
    {
      id: 4,
      title: "Contextual AI Support",
      description: "Receive personalized interventions when you need them most",
      icon: "🤖",
      timeline: "Current",
      progress: 90,
      details: [
        "Predictive AI that anticipates stress points",
        "Contextually aware intervention suggestions",
        "Personalized coping strategy recommendations",
        "Adaptive learning from your feedback and patterns"
      ]
    },
    {
      id: 5,
      title: "Community Challenges",
      description: "Connect with others through anonymous wellness challenges",
      icon: "👥",
      timeline: "Coming Soon",
      progress: 45,
      details: [
        "Opt-in anonymous community participation",
        "Group challenges with shared goals",
        "Privacy-focused social accountability",
        "Achievement tracking and collective milestones"
      ]
    },
    {
      id: 6,
      title: "Environmental Impact Tracking",
      description: "Understand how external factors affect your mental state",
      icon: "🌦️",
      timeline: "Future",
      progress: 15,
      details: [
        "Weather pattern correlation with mood changes",
        "Air quality and environmental factor analysis",
        "News and social media impact tracking",
        "Lunar cycle and seasonal variation insights"
      ]
    },
    {
      id: 7,
      title: "Mindfulness Micropractices",
      description: "30-second exercises targeted to specific emotional needs",
      icon: "🧘‍♂️",
      timeline: "Current",
      progress: 95,
      details: [
        "Ultra-short mindfulness interventions",
        "Emotion-specific breathing techniques",
        "Quick grounding exercises for anxiety",
        "Micro-meditation for immediate stress relief"
      ]
    },
    {
      id: 8,
      title: "Personalized Learning Modules",
      description: "Adaptive mental health education based on your needs",
      icon: "📚",
      timeline: "Coming Soon",
      progress: 55,
      details: [
        "Tailored educational content for your specific challenges",
        "Adaptive learning paths based on progress",
        "Interactive skill-building exercises",
        "Evidence-based psychological techniques and theories"
      ]
    },
    {
      id: 9,
      title: "AR Calm Spaces",
      description: "Transform your environment into personalized calming spaces",
      icon: "🏞️",
      timeline: "Future",
      progress: 10,
      details: [
        "Augmented reality environments for stress reduction",
        "Customizable visual and audio elements",
        "Guided immersive relaxation experiences",
        "Integration with smart home devices for full sensory experience"
      ]
    },
    {
      id: 10,
      title: "Growth Journey Map",
      description: "Visualize your mental wellness journey as an interactive map",
      icon: "🗺️",
      timeline: "Coming Soon",
      progress: 40,
      details: [
        "Visual representation of your wellness journey",
        "Achievement milestones and progress markers",
        "Future goal pathways and exploration options",
        "Personal insights and growth documentation"
      ]
    }
  ];
  
  const getProgressColor = (timeline: string, progress: number) => {
    if (timeline === 'Current') return 'var(--theme-success)';
    if (timeline === 'Coming Soon') return 'var(--theme-primary)';
    return 'var(--theme-warning)';
  };
  
  const toggleFeatureExpand = (id: number) => {
    if (expandedFeature === id) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(id);
    }
  };
  
  return (
    <div className="roadmap-container">
      <header className="page-header">
        <h1>Feature Roadmap</h1>
        <p className="subtitle">Discover what's coming to MindScope</p>
      </header>
      
      <div className="timeline-filter">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Current</button>
        <button className="filter-btn">Coming Soon</button>
        <button className="filter-btn">Future</button>
      </div>
      
      <div className="features-grid">
        {features.map(feature => (
          <div 
            key={feature.id} 
            className={`feature-card ${expandedFeature === feature.id ? 'expanded' : ''}`}
            onClick={() => toggleFeatureExpand(feature.id)}
          >
            <div className="feature-header">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-timeline">{feature.timeline}</div>
            </div>
            
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
            
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ 
                  width: `${feature.progress}%`,
                  backgroundColor: getProgressColor(feature.timeline, feature.progress)
                }}
              ></div>
              <span className="progress-text">{feature.progress}% Complete</span>
            </div>
            
            {expandedFeature === feature.id && (
              <div className="feature-details">
                <h3>What to expect:</h3>
                <ul>
                  {feature.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
                {feature.timeline === 'Current' && (
                  <Link href="/dashboard" className="try-now-btn">
                    Try Now
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="feedback-section">
        <h2>Have a feature idea?</h2>
        <p>We'd love to hear your suggestions for new features that would help your mental wellness journey.</p>
        <button className="feedback-btn">Share Your Ideas</button>
      </div>
      
      <style jsx>{`
        .roadmap-container {
          padding-bottom: 4rem;
        }
        
        .page-header {
          margin-bottom: 2rem;
        }
        
        .page-header h1 {
          margin-bottom: 0.5rem;
          font-size: 1.75rem;
          color: var(--foreground);
        }
        
        .subtitle {
          color: var(--gray-600);
          font-size: 0.95rem;
        }
        
        .timeline-filter {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background-color: var(--gray-100);
          padding: 0.25rem;
          border-radius: 8px;
          width: fit-content;
        }
        
        .filter-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          background: none;
          color: var(--gray-600);
          font-weight: 500;
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        
        .filter-btn.active {
          background-color: var(--card-background);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        
        .filter-btn:hover {
          background-color: var(--card-background);
          transform: translateY(-2px);
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .feature-card {
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          transition: all var(--transition-normal);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .feature-card.expanded {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .feature-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .feature-icon {
          font-size: 2rem;
        }
        
        .feature-timeline {
          font-size: 0.8rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          background-color: var(--gray-100);
          color: var(--gray-800);
          font-weight: 500;
        }
        
        .feature-title {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
          color: var(--foreground);
        }
        
        .feature-description {
          color: var(--gray-600);
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
        }
        
        .progress-container {
          height: 8px;
          background-color: var(--gray-200);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
          position: relative;
        }
        
        .progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease, background-color var(--transition-normal);
        }
        
        .progress-text {
          font-size: 0.8rem;
          color: var(--gray-600);
        }
        
        .feature-details {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--gray-200);
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .feature-details h3 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        
        .feature-details ul {
          padding-left: 1.25rem;
          margin-bottom: 1.25rem;
        }
        
        .feature-details li {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--gray-700);
        }
        
        .try-now-btn {
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: var(--primary);
          color: white;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        
        .try-now-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        
        .feedback-section {
          margin-top: 3rem;
          padding: 2rem;
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          text-align: center;
          border: 1px solid var(--gray-200);
        }
        
        .feedback-section h2 {
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }
        
        .feedback-section p {
          max-width: 500px;
          margin: 0 auto 1.5rem;
          color: var(--gray-600);
        }
        
        .feedback-btn {
          padding: 0.75rem 1.5rem;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .feedback-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
};

export default RoadmapPage; 