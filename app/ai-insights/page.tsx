'use client';

import React, { useState, useEffect } from 'react';

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'sleep' | 'mood' | 'stress' | 'activity' | 'social' | 'nutrition';
  date: string;
  isNew: boolean;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'sleep' | 'mood' | 'stress' | 'activity' | 'social' | 'nutrition';
  impact: 'high' | 'medium' | 'low';
  saved: boolean;
}

const AIInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'insights' | 'recommendations'>('insights');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');

  const categories = [
    { id: 'sleep', label: 'Sleep', icon: '😴' },
    { id: 'mood', label: 'Mood', icon: '😊' },
    { id: 'stress', label: 'Stress', icon: '😓' },
    { id: 'activity', label: 'Activity', icon: '🏃‍♂️' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
  ];

  // Simulated data fetch
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setInsights(mockInsights);
      setRecommendations(mockRecommendations);
      setIsLoading(false);
      
      // Show welcome modal on first visit
      const hasSeenWelcome = localStorage.getItem('hasSeenAIWelcome');
      if (!hasSeenWelcome) {
        setShowWelcomeModal(true);
        localStorage.setItem('hasSeenAIWelcome', 'true');
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredInsights = activeCategory 
    ? insights.filter(insight => insight.category === activeCategory) 
    : insights;
    
  const filteredRecommendations = activeCategory 
    ? recommendations.filter(rec => rec.category === activeCategory) 
    : recommendations;

  const handleSaveRecommendation = (id: string) => {
    setRecommendations(prevRecs => 
      prevRecs.map(rec => 
        rec.id === id ? {...rec, saved: !rec.saved} : rec
      )
    );
  };

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    
    setAiThinking(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const newInsight: Insight = {
        id: `insight-${Date.now()}`,
        title: "Personalized Insight",
        description: `Based on your question about "${userQuestion}", I've analyzed your patterns. It seems your mood improves significantly after physical activity, especially in the morning. Consider adding short morning walks to your routine for a mood boost throughout the day.`,
        category: 'mood',
        date: new Date().toISOString(),
        isNew: true
      };
      
      setInsights(prev => [newInsight, ...prev]);
      setUserQuestion('');
      setAiThinking(false);
      setActiveTab('insights');
    }, 3000);
  };

  return (
    <div className="ai-insights-container">
      <header className="page-header">
        <h1>AI Insights</h1>
        <p className="subtitle">Personalized wellness insights based on your data</p>
      </header>
      
      <div className="ai-assistant-section">
        <div className="ai-assistant-header">
          <div className="ai-avatar">🧠</div>
          <div className="ai-title">
            <h2>MindScope Assistant</h2>
            <p>Ask anything about your wellness data</p>
          </div>
        </div>
        
        <form onSubmit={handleAskAI} className="ai-input-form">
          <input
            type="text"
            placeholder="Ask me about your sleep, mood patterns, or for wellness advice..."
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            disabled={aiThinking}
            className="ai-input"
          />
          <button 
            type="submit" 
            className="ai-submit-btn"
            disabled={aiThinking || !userQuestion.trim()}
          >
            {aiThinking ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>
      </div>
      
      <div className="categories-filter">
        <button 
          className={`category-pill ${activeCategory === null ? 'active' : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category.id}
            className={`category-pill ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights ({filteredInsights.length})
        </button>
        <button 
          className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations ({filteredRecommendations.length})
        </button>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-brain">🧠</div>
            <p>Analyzing your patterns...</p>
          </div>
        </div>
      ) : (
        <div className="insights-content">
          {activeTab === 'insights' && (
            <>
              {filteredInsights.length === 0 ? (
                <div className="empty-state">
                  <p>No insights available for this category yet.</p>
                </div>
              ) : (
                <div className="insights-grid">
                  {filteredInsights.map(insight => (
                    <div key={insight.id} className={`insight-card ${insight.isNew ? 'new-insight' : ''}`}>
                      {insight.isNew && <div className="new-badge">New</div>}
                      <div className="insight-icon">
                        {getCategoryIcon(insight.category)}
                      </div>
                      <h3 className="insight-title">{insight.title}</h3>
                      <p className="insight-description">{insight.description}</p>
                      <div className="insight-footer">
                        <span className="insight-date">{formatDate(insight.date)}</span>
                        <button className="insight-action-btn">Save</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          {activeTab === 'recommendations' && (
            <>
              {filteredRecommendations.length === 0 ? (
                <div className="empty-state">
                  <p>No recommendations available for this category yet.</p>
                </div>
              ) : (
                <div className="recommendations-list">
                  {filteredRecommendations.map(recommendation => (
                    <div key={recommendation.id} className="recommendation-card">
                      <div className="recommendation-header">
                        <div className="recommendation-icon">
                          {getCategoryIcon(recommendation.category)}
                        </div>
                        <div className="recommendation-impact">
                          <span className={`impact-badge impact-${recommendation.impact}`}>
                            {recommendation.impact.charAt(0).toUpperCase() + recommendation.impact.slice(1)} Impact
                          </span>
                        </div>
                      </div>
                      <h3 className="recommendation-title">{recommendation.title}</h3>
                      <p className="recommendation-description">{recommendation.description}</p>
                      <div className="recommendation-footer">
                        <button 
                          className={`save-btn ${recommendation.saved ? 'saved' : ''}`}
                          onClick={() => handleSaveRecommendation(recommendation.id)}
                        >
                          {recommendation.saved ? 'Saved' : 'Save'}
                        </button>
                        <button className="try-btn">Try This</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowWelcomeModal(false)}>×</button>
            <div className="modal-header">
              <div className="welcome-icon">🧠</div>
              <h2>Welcome to AI Insights</h2>
            </div>
            <p>
              I'm your personal wellness assistant. I analyze your mood tracking data, 
              activity patterns, and other information to provide personalized insights 
              and recommendations to improve your mental wellbeing.
            </p>
            <p>
              You can ask me specific questions about your patterns or request 
              recommendations for improving particular aspects of your wellness.
            </p>
            <button 
              className="primary-button"
              onClick={() => setShowWelcomeModal(false)}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .ai-insights-container {
          padding-bottom: 2rem;
        }
        
        .page-header {
          margin-bottom: 1.5rem;
        }
        
        .page-header h1 {
          margin-bottom: 0.5rem;
          font-size: 1.75rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .subtitle {
          color: var(--gray-600);
          font-size: 0.95rem;
          transition: color var(--transition-normal);
        }
        
        .ai-assistant-section {
          padding: 1.25rem;
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          margin-bottom: 1.5rem;
          transition: background-color var(--transition-normal), border-color var(--transition-normal);
        }
        
        .ai-assistant-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .ai-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
        }
        
        .ai-title h2 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .ai-title p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--gray-600);
          transition: color var(--transition-normal);
        }
        
        .ai-input-form {
          display: flex;
          gap: 0.75rem;
        }
        
        .ai-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 50px;
          border: 1px solid var(--gray-300);
          background-color: var(--background);
          color: var(--foreground);
          font-size: 0.95rem;
          transition: all var(--transition-fast);
        }
        
        .ai-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(79, 124, 172, 0.2);
        }
        
        .ai-submit-btn {
          padding: 0.75rem 1.25rem;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        
        .ai-submit-btn:hover:not(:disabled) {
          background-color: var(--primary-dark);
          transform: translateY(-1px);
        }
        
        .ai-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .categories-filter {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .categories-filter::-webkit-scrollbar {
          display: none;
        }
        
        .category-pill {
          padding: 0.5rem 1rem;
          background-color: var(--gray-100);
          border: 1px solid var(--gray-200);
          border-radius: 50px;
          color: var(--gray-600);
          font-size: 0.9rem;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        
        .category-pill.active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: white;
        }
        
        .category-icon {
          margin-right: 0.25rem;
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid var(--gray-200);
          margin-bottom: 1.5rem;
          transition: border-color var(--transition-normal);
        }
        
        .tab {
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          font-weight: 600;
          color: var(--gray-600);
          position: relative;
          transition: color var(--transition-fast);
        }
        
        .tab.active {
          color: var(--primary);
        }
        
        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--primary);
          border-radius: 2px 2px 0 0;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
        }
        
        .loading-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: pulse 1.5s infinite alternate;
        }
        
        .loading-brain {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: bounce 2s infinite;
        }
        
        @keyframes pulse {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .insights-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 640px) {
          .insights-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .insight-card {
          padding: 1.25rem;
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          border: 1px solid var(--gray-200);
          position: relative;
          transition: all var(--transition-normal);
        }
        
        .insight-card.new-insight {
          border-color: var(--primary);
          animation: highlightPulse 2s ease-in-out;
        }
        
        @keyframes highlightPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(79, 124, 172, 0); }
          50% { box-shadow: 0 0 10px rgba(79, 124, 172, 0.3); }
        }
        
        .new-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          padding: 0.25rem 0.5rem;
          background-color: var(--primary);
          color: white;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .insight-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--gray-100);
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          transition: background-color var(--transition-normal);
        }
        
        .insight-title {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .insight-description {
          margin: 0 0 1rem;
          font-size: 0.95rem;
          color: var(--gray-600);
          line-height: 1.5;
          transition: color var(--transition-normal);
        }
        
        .insight-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        
        .insight-date {
          color: var(--gray-500);
          transition: color var(--transition-normal);
        }
        
        .insight-action-btn {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          cursor: pointer;
        }
        
        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .recommendation-card {
          padding: 1.25rem;
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          border: 1px solid var(--gray-200);
          transition: all var(--transition-normal);
        }
        
        .recommendation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .recommendation-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--gray-100);
          font-size: 1.25rem;
          transition: background-color var(--transition-normal);
        }
        
        .impact-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
        }
        
        .impact-high {
          background-color: rgba(244, 67, 54, 0.1);
          color: #F44336;
        }
        
        .impact-medium {
          background-color: rgba(255, 152, 0, 0.1);
          color: #FF9800;
        }
        
        .impact-low {
          background-color: rgba(76, 175, 80, 0.1);
          color: #4CAF50;
        }
        
        .recommendation-title {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .recommendation-description {
          margin: 0 0 1rem;
          font-size: 0.95rem;
          color: var(--gray-600);
          line-height: 1.5;
          transition: color var(--transition-normal);
        }
        
        .recommendation-footer {
          display: flex;
          gap: 0.75rem;
        }
        
        .save-btn, .try-btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }
        
        .save-btn {
          background-color: var(--gray-100);
          border: 1px solid var(--gray-300);
          color: var(--gray-600);
          transition: background-color var(--transition-normal), border-color var(--transition-normal);
        }
        
        .save-btn.saved {
          background-color: rgba(76, 175, 80, 0.1);
          border-color: #4CAF50;
          color: #4CAF50;
        }
        
        .try-btn {
          background-color: var(--primary);
          border: none;
          color: white;
        }
        
        .empty-state {
          padding: 2rem;
          text-align: center;
          color: var(--gray-500);
          transition: color var(--transition-normal);
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s;
        }
        
        .modal-content {
          position: relative;
          width: 90%;
          max-width: 500px;
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          padding: 2rem;
          animation: slideUp 0.3s;
          transition: background-color var(--transition-normal);
        }
        
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--gray-500);
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        
        .modal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .welcome-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: pulse 2s infinite alternate;
        }
        
        .modal-header h2 {
          margin: 0;
          text-align: center;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .modal-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
          color: var(--gray-600);
          transition: color var(--transition-normal);
        }
        
        .primary-button {
          display: block;
          width: 100%;
          padding: 0.75rem;
          margin-top: 1.5rem;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        
        .primary-button:hover {
          background-color: var(--primary-dark);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Helper functions
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'sleep': return '😴';
    case 'mood': return '😊';
    case 'stress': return '😓';
    case 'activity': return '🏃‍♂️';
    case 'social': return '👥';
    case 'nutrition': return '🍎';
    default: return '🧠';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Mock data
const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Sleep Pattern Analysis',
    description: 'Your sleep quality improves when you go to bed before 11pm. On nights when you sleep before 11pm, your mood is 30% better the following day.',
    category: 'sleep',
    date: '2023-05-10T10:00:00Z',
    isNew: false
  },
  {
    id: '2',
    title: 'Mood Correlation',
    description: 'There\'s a strong correlation between your exercise sessions and positive mood entries. Days with exercise show a 45% increase in positive mood scores.',
    category: 'mood',
    date: '2023-05-08T14:30:00Z',
    isNew: false
  },
  {
    id: '3',
    title: 'Stress Trigger Identified',
    description: 'Academic deadlines appear to be a significant stress trigger. Stress levels peak 2-3 days before assignment due dates.',
    category: 'stress',
    date: '2023-05-05T09:15:00Z',
    isNew: false
  },
  {
    id: '4',
    title: 'Social Connection Impact',
    description: 'Your mood scores are significantly higher on days when you record social interactions with friends or family members.',
    category: 'social',
    date: '2023-05-01T16:45:00Z',
    isNew: false
  }
];

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Establish a Consistent Sleep Schedule',
    description: 'Based on your sleep data, we recommend going to bed between 10:30-11:00 PM consistently to improve your overall sleep quality and mood.',
    category: 'sleep',
    impact: 'high',
    saved: false
  },
  {
    id: '2',
    title: 'Morning Exercise Routine',
    description: 'Your data shows a strong correlation between morning exercise and positive mood throughout the day. Try a 15-minute workout before 9 AM.',
    category: 'activity',
    impact: 'medium',
    saved: true
  },
  {
    id: '3',
    title: 'Stress Management Technique',
    description: 'Consider implementing the 5-5-5 breathing technique (inhale for 5 seconds, hold for 5, exhale for 5) when you notice stress levels rising, especially before deadlines.',
    category: 'stress',
    impact: 'high',
    saved: false
  },
  {
    id: '4',
    title: 'Weekly Social Connection',
    description: 'Schedule at least one meaningful social interaction each week, as your data indicates this significantly improves your mood and reduces stress.',
    category: 'social',
    impact: 'medium',
    saved: false
  },
  {
    id: '5',
    title: 'Hydration Reminder',
    description: 'Your mood entries suggest better overall wellbeing on days with proper hydration. Aim for 8 glasses of water daily, with a special focus during study sessions.',
    category: 'nutrition',
    impact: 'low',
    saved: false
  }
];

export default AIInsights; 