'use client';

import React, { useState, useEffect } from 'react';

interface MoodTrend {
  day: string;
  score: number;
}

interface ActivityMetric {
  name: string;
  minutes: number;
  icon: string;
}

interface StressLevel {
  date: string;
  level: number;
}

interface ChallengeProgress {
  category: string;
  completed: number;
  total: number;
}

// Fixed seed data to ensure consistency between server and client rendering
const initialMoodTrends: MoodTrend[] = [];
const initialActivityMetrics: ActivityMetric[] = [
  { name: 'Meditation', minutes: 85, icon: '🧘‍♂️' },
  { name: 'Exercise', minutes: 150, icon: '🏃‍♂️' },
  { name: 'Sleep', minutes: 420, icon: '😴' },
  { name: 'Reading', minutes: 60, icon: '📚' }
];
const initialStressLevels: StressLevel[] = [];
const initialChallengeProgress: ChallengeProgress[] = [
  { category: 'Mindfulness', completed: 12, total: 15 },
  { category: 'Physical Activity', completed: 8, total: 10 },
  { category: 'Sleep', completed: 5, total: 7 },
  { category: 'Social', completed: 3, total: 6 }
];

// Generate fixed dates for initial rendering
for (let i = 0; i < 7; i++) {
  const date = new Date(2023, 5, 15 - i); // Fixed date to avoid hydration mismatch
  initialMoodTrends.push({
    day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    score: 3 + (i % 3) // Predictable scores between 3-5
  });
  
  initialStressLevels.push({
    date: date.toLocaleDateString('en-US', { weekday: 'short' }),
    level: 4 + (i % 4) // Predictable levels between 4-7
  });
}

const AnalyticsPage: React.FC = () => {
  const [moodTrends, setMoodTrends] = useState<MoodTrend[]>(initialMoodTrends);
  const [activityMetrics, setActivityMetrics] = useState<ActivityMetric[]>(initialActivityMetrics);
  const [stressLevels, setStressLevels] = useState<StressLevel[]>(initialStressLevels);
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress[]>(initialChallengeProgress);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialRender, setHasInitialRender] = useState(false);

  // Wait for component to mount before loading dynamic data
  useEffect(() => {
    setHasInitialRender(true);
  }, []);

  // Simulated data fetch - only run after initial render is complete
  useEffect(() => {
    if (!hasInitialRender) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Generate mock data based on selected timeframe
      generateMockData(selectedTimeframe);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [selectedTimeframe, hasInitialRender]);

  const generateMockData = (timeframe: 'week' | 'month' | 'year') => {
    // Generate mood trends
    const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 52;
    const trends = [];
    const seedValue = timeframe === 'week' ? 42 : timeframe === 'month' ? 123 : 456;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Use deterministic values based on index and seed
      const scoreBase = ((i * 7 + seedValue) % 35) / 10;
      
      trends.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        score: Math.max(1, Math.min(5, 1 + scoreBase)) // Score between 1-5
      });
    }
    
    setMoodTrends(trends.reverse());
    
    // Activity metrics with deterministic values
    setActivityMetrics([
      { name: 'Meditation', minutes: 50 + ((seedValue % 10) * 5), icon: '🧘‍♂️' },
      { name: 'Exercise', minutes: 100 + ((seedValue % 8) * 10), icon: '🏃‍♂️' },
      { name: 'Sleep', minutes: 400 + ((seedValue % 6) * 15), icon: '😴' },
      { name: 'Reading', minutes: 40 + ((seedValue % 12) * 5), icon: '📚' }
    ]);
    
    // Stress levels
    const stress = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Use deterministic value
      const levelBase = ((i * 3 + seedValue) % 9);
      
      stress.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        level: Math.max(1, Math.min(10, 1 + levelBase)) // Level between 1-10
      });
    }
    
    setStressLevels(stress.reverse());
    
    // Challenge progress remains consistent
    setChallengeProgress([
      { category: 'Mindfulness', completed: 12, total: 15 },
      { category: 'Physical Activity', completed: 8, total: 10 },
      { category: 'Sleep', completed: 5, total: 7 },
      { category: 'Social', completed: 3, total: 6 }
    ]);
  };

  const getEmoji = (score: number) => {
    if (score >= 4.5) return '😁';
    if (score >= 3.5) return '😊';
    if (score >= 2.5) return '😐';
    if (score >= 1.5) return '☹️';
    return '😢';
  };

  const getBarHeight = (score: number) => {
    return `${score * 20}%`; // 5 is max score, so 5 * 20 = 100%
  };

  const getBarColor = (score: number) => {
    if (score >= 4) return 'var(--theme-success)';
    if (score >= 3) return 'var(--theme-primary)';
    if (score >= 2) return 'var(--theme-warning)';
    return 'var(--theme-error)';
  };

  const getProgressColor = (ratio: number) => {
    if (ratio >= 0.8) return 'var(--theme-success)';
    if (ratio >= 0.5) return 'var(--theme-primary)';
    if (ratio >= 0.3) return 'var(--theme-warning)';
    return 'var(--theme-error)';
  };

  return (
    <div className="analytics-container">
      <header className="page-header">
        <h1>Analytics</h1>
        <p className="subtitle">Track your mental wellness progress</p>
      </header>
      
      <div className="timeframe-selector">
        <button 
          className={`timeframe-btn ${selectedTimeframe === 'week' ? 'active' : ''}`}
          onClick={() => setSelectedTimeframe('week')}
        >
          Week
        </button>
        <button 
          className={`timeframe-btn ${selectedTimeframe === 'month' ? 'active' : ''}`}
          onClick={() => setSelectedTimeframe('month')}
        >
          Month
        </button>
        <button 
          className={`timeframe-btn ${selectedTimeframe === 'year' ? 'active' : ''}`}
          onClick={() => setSelectedTimeframe('year')}
        >
          Year
        </button>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-icon">📊</div>
            <p>Analyzing your wellness data...</p>
          </div>
        </div>
      ) : (
        <div className="analytics-content">
          {/* Mood Trends Chart */}
          <div className="card mood-trends-card">
            <h2 className="card-title">Mood Trends</h2>
            <div className="mood-chart">
              {moodTrends.slice(0, 7).map((mood, index) => (
                <div key={index} className="mood-chart-column">
                  <div className="mood-emoji">{getEmoji(mood.score)}</div>
                  <div className="mood-bar-container">
                    <div 
                      className="mood-bar" 
                      style={{ 
                        height: getBarHeight(mood.score),
                        backgroundColor: getBarColor(mood.score)
                      }}
                    />
                  </div>
                  <div className="mood-date">{mood.day.split(',')[0]}</div>
                </div>
              ))}
            </div>
            <p className="insight-text">Your mood has been {getAverageMoodStatus(moodTrends)} this week.</p>
          </div>
          
          {/* Wellness Activity */}
          <div className="card wellness-activity-card">
            <h2 className="card-title">Wellness Activity</h2>
            <div className="activity-metrics">
              {activityMetrics.map((activity, index) => (
                <div key={index} className="activity-metric">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-details">
                    <div className="activity-name">{activity.name}</div>
                    <div className="activity-time">{formatMinutes(activity.minutes)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stress Levels */}
          <div className="card stress-levels-card">
            <h2 className="card-title">Stress Levels</h2>
            <div className="stress-chart">
              {stressLevels.map((stress, index) => (
                <div key={index} className="stress-day">
                  <div className="stress-level-bar-container">
                    <div 
                      className="stress-level-bar" 
                      style={{ 
                        height: `${stress.level * 10}%`,
                        backgroundColor: getStressColor(stress.level)
                      }}
                    />
                  </div>
                  <div className="stress-date">{stress.date}</div>
                </div>
              ))}
            </div>
            <p className="insight-text">
              {getStressInsight(stressLevels)}
            </p>
          </div>
          
          {/* Challenge Progress */}
          <div className="card challenge-progress-card">
            <h2 className="card-title">Challenge Progress</h2>
            <div className="challenge-list">
              {challengeProgress.map((challenge, index) => (
                <div key={index} className="challenge-item">
                  <div className="challenge-info">
                    <div className="challenge-category">{challenge.category}</div>
                    <div className="challenge-count">
                      {challenge.completed}/{challenge.total} completed
                    </div>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${(challenge.completed / challenge.total) * 100}%`,
                        backgroundColor: getProgressColor(challenge.completed / challenge.total)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .analytics-container {
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
        
        .timeframe-selector {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background-color: var(--gray-100);
          padding: 0.25rem;
          border-radius: 8px;
          width: fit-content;
          transition: background-color var(--transition-normal);
        }
        
        .timeframe-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          background: none;
          color: var(--gray-600);
          font-weight: 500;
          transition: all var(--transition-fast);
        }
        
        .timeframe-btn.active {
          background-color: var(--card-background);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
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
        
        .loading-icon {
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
        
        .analytics-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .analytics-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .card {
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          transition: background-color var(--transition-normal), border-color var(--transition-normal);
        }
        
        .card-title {
          margin: 0 0 1.25rem;
          font-size: 1.2rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        /* Mood Trends */
        .mood-chart {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 180px;
          margin-bottom: 1rem;
        }
        
        .mood-chart-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          padding: 0 0.25rem;
        }
        
        .mood-emoji {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .mood-bar-container {
          width: 100%;
          height: 120px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
        
        .mood-bar {
          width: 80%;
          max-width: 20px;
          border-radius: 3px 3px 0 0;
          transition: height 0.5s ease, background-color var(--transition-normal);
        }
        
        .mood-date {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: var(--foreground);
          text-align: center;
          transition: color var(--transition-normal);
        }
        
        /* Activity Metrics */
        .activity-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        
        .activity-metric {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
          transition: background-color var(--transition-normal);
        }
        
        .activity-details {
          flex: 1;
        }
        
        .activity-name {
          font-weight: 500;
          margin-bottom: 0.25rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .activity-time {
          font-size: 0.9rem;
          color: var(--gray-600);
          transition: color var(--transition-normal);
        }
        
        /* Stress Levels */
        .stress-chart {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 150px;
          margin-bottom: 1rem;
        }
        
        .stress-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        
        .stress-level-bar-container {
          height: 100px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          margin-bottom: 0.5rem;
        }
        
        .stress-level-bar {
          width: 80%;
          max-width: 15px;
          border-radius: 3px 3px 0 0;
          transition: height 0.5s ease, background-color var(--transition-normal);
        }
        
        .stress-date {
          font-size: 0.8rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        /* Challenge Progress */
        .challenge-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .challenge-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .challenge-info {
          display: flex;
          justify-content: space-between;
        }
        
        .challenge-category {
          font-weight: 500;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .challenge-count {
          font-size: 0.9rem;
          color: var(--gray-600);
          transition: color var(--transition-normal);
        }
        
        .progress-bar-container {
          height: 8px;
          background-color: var(--gray-200);
          border-radius: 4px;
          overflow: hidden;
          transition: background-color var(--transition-normal);
        }
        
        .progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease, background-color var(--transition-normal);
        }
        
        .insight-text {
          margin: 0.5rem 0 0;
          font-size: 0.9rem;
          color: var(--gray-600);
          font-style: italic;
          transition: color var(--transition-normal);
        }
      `}</style>
    </div>
  );
};

// Helper functions
const formatMinutes = (minutes: number) => {
  if (minutes < 60) return `${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const getAverageMoodStatus = (moods: MoodTrend[]) => {
  const avg = moods.reduce((sum, mood) => sum + mood.score, 0) / moods.length;
  if (avg >= 4) return 'excellent';
  if (avg >= 3) return 'good';
  if (avg >= 2) return 'neutral';
  return 'below average';
};

const getStressColor = (level: number) => {
  if (level <= 3) return 'var(--theme-success)';
  if (level <= 6) return 'var(--theme-warning)';
  return 'var(--theme-error)';
};

const getStressInsight = (stressLevels: StressLevel[]) => {
  const avg = stressLevels.reduce((sum, day) => sum + day.level, 0) / stressLevels.length;
  if (avg <= 3) return 'Your stress levels have been low - keep up the good work!';
  if (avg <= 6) return 'Moderate stress detected. Consider adding more relaxation activities.';
  return 'High stress detected. Prioritize self-care and stress management techniques.';
};

export default AnalyticsPage; 