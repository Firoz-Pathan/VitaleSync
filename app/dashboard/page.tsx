'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import useMediaQuery from '../../hooks/useMediaQuery';

interface MoodEntry {
  date: string;
  mood: string;
  stressLevel: number;
  activities: string[];
  note?: string;
}

interface InsightType {
  id: string;
  title: string;
  content: string;
  type: 'positive' | 'neutral' | 'warning';
  actionable?: boolean;
}

interface StressFactorType {
  factor: string;
  percentage: number;
}

const dashboardStyles = {
  container: {
    padding: '12px',
    height: '100%',
    overflowY: 'auto' as const,
  },
  greeting: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    paddingLeft: '0.5rem',
  },
  date: {
    fontSize: '0.9rem', 
    color: 'var(--gray-600)',
    marginBottom: '1rem',
    paddingLeft: '0.5rem',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  card: {
    backgroundColor: 'var(--background)',
    borderRadius: 'var(--app-border-radius)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid var(--gray-200)',
    padding: '1.25rem'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 0
  },
  moodTrackerPrompt: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    gap: '1rem',
    backgroundColor: 'rgba(94, 106, 210, 0.1)',
    borderRadius: 'var(--app-border-radius)',
    marginBottom: '1rem',
  },
  moodTrackerIcon: {
    fontSize: '1.75rem',
  },
  moodTrackerText: {
    flex: 1,
  },
  moodTrackerTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  moodTrackerSubtitle: {
    fontSize: '0.85rem',
    color: 'var(--gray-600)',
  },
  moodTrackerButton: {
    padding: '0.5rem 0.85rem',
    backgroundColor: 'var(--theme-blue)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  streakCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    gap: '1rem',
    backgroundColor: 'rgba(255, 199, 95, 0.1)',
    borderRadius: 'var(--app-border-radius)',
    marginBottom: '1rem',
  },
  streakIcon: {
    fontSize: '1.75rem',
  },
  streakInfo: {
    flex: 1,
  },
  streakCount: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  streakText: {
    fontSize: '0.85rem',
    color: 'var(--gray-600)',
  },
  moodCalendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  calendarDay: {
    aspectRatio: '1',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    fontSize: '0.8rem',
    position: 'relative' as const,
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
  },
  calendarLabel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.5rem',
    marginBottom: '0.25rem',
  },
  dayLabel: {
    fontSize: '0.7rem',
    textAlign: 'center' as const,
    color: 'var(--gray-600)',
  },
  calendarDayEmpty: {
    backgroundColor: 'var(--gray-100)',
  },
  calendarDayFilled: {
    backgroundImage: 'linear-gradient(to bottom, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.2))',
    border: '1px solid rgba(76, 175, 80, 0.3)',
  },
  calendarDayMood: {
    fontSize: '1.1rem',
    marginBottom: '0.1rem',
  },
  calendarDayDate: {
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  insightsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  insight: {
    padding: '1rem',
    borderRadius: 'var(--app-border-radius)',
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
    border: '1px solid rgba(76, 175, 80, 0.2)',
    position: 'relative' as const,
  },
  insightPositive: {
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  insightNeutral: {
    backgroundColor: 'rgba(33, 150, 243, 0.05)',
    borderColor: 'rgba(33, 150, 243, 0.2)',
  },
  insightWarning: {
    backgroundColor: 'rgba(255, 152, 0, 0.05)',
    borderColor: 'rgba(255, 152, 0, 0.2)',
  },
  insightHeader: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '0.5rem',
    alignItems: 'flex-start',
  },
  insightIcon: {
    fontSize: '1.25rem',
  },
  insightInfo: {
    flex: 1,
  },
  insightTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  insightContent: {
    margin: 0,
    fontSize: '0.85rem',
    lineHeight: '1.4',
  },
  insightActionButton: {
    padding: '0.4rem 0.75rem',
    fontSize: '0.8rem',
    backgroundColor: 'var(--theme-blue)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    marginTop: '0.75rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  stressFactorList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  stressFactor: {
    marginBottom: '0.5rem',
  },
  stressFactorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.25rem',
  },
  stressFactorName: {
    fontSize: '0.85rem',
  },
  stressFactorValue: {
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  progressBar: {
    height: '8px',
    backgroundColor: 'var(--gray-100)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  challengesList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  challenge: {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.85rem',
    backgroundColor: 'var(--gray-50)',
    borderRadius: 'var(--app-border-radius)',
    alignItems: 'center',
    border: '1px solid var(--gray-200)',
  },
  challengeIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    fontSize: '1.25rem',
    backgroundColor: 'rgba(94, 106, 210, 0.1)',
  },
  challengeDetails: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '0.2rem',
  },
  challengeDescription: {
    fontSize: '0.75rem', 
    color: 'var(--gray-600)',
  },
  linkButton: {
    display: 'inline-block',
    padding: '0.6rem 1rem',
    backgroundColor: 'var(--theme-blue)',
    color: 'white',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    marginTop: '1rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  sectionHeader: {
    fontSize: '1.1rem',
    fontWeight: 'bold', 
    marginBottom: '0.75rem',
    marginTop: '1.25rem',
    paddingLeft: '0.5rem',
  },
  weeklyMoodDay: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    width: '100%',
    position: 'relative' as const,
  },
  moodDayLabel: {
    fontSize: '0.8rem',
    fontWeight: '500',
    marginTop: '0.5rem',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)',
  },
};

const Dashboard: React.FC = () => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  // Mock data
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: '2023-05-01', mood: '😊', stressLevel: 3, activities: ['exercise', 'meditation'] },
    { date: '2023-05-02', mood: '😐', stressLevel: 5, activities: ['study'] },
    { date: '2023-05-03', mood: '😔', stressLevel: 7, activities: ['poorSleep', 'study'] },
    { date: '2023-05-04', mood: '😊', stressLevel: 4, activities: ['exercise', 'social'] },
    { date: '2023-05-05', mood: '🙂', stressLevel: 4, activities: ['meditation'] },
    // Current week
    { date: '2023-05-06', mood: '😊', stressLevel: 3, activities: ['exercise', 'goodSleep'] },
    { date: '2023-05-07', mood: '😐', stressLevel: 5, activities: ['study', 'reading'] },
    { date: '2023-05-08', mood: '😔', stressLevel: 8, activities: ['poorSleep', 'study'] },
    { date: '2023-05-09', mood: '😐', stressLevel: 6, activities: ['study'] },
    { date: '2023-05-10', mood: '🙂', stressLevel: 4, activities: ['exercise', 'meditation'] },
    { date: '2023-05-11', mood: '😊', stressLevel: 3, activities: ['exercise', 'social', 'goodSleep'] },
    { date: '2023-05-12', mood: '🙂', stressLevel: 4, activities: ['reading', 'meditation'] }
  ]);

  const [insights, setInsights] = useState<InsightType[]>([
    {
      id: '1',
      title: 'Exercise improves your mood',
      content: 'We noticed you feel better on days when you exercise. Keep up the good work!',
      type: 'positive',
      actionable: false
    },
    {
      id: '2',
      title: 'Sleep pattern affecting stress',
      content: 'Poor sleep seems to correlate with higher stress levels. Consider improving your sleep routine.',
      type: 'warning',
      actionable: true
    },
    {
      id: '3',
      title: 'Meditation effectiveness',
      content: 'Meditation has helped reduce your stress levels by approximately 20% on days you practice.',
      type: 'positive',
      actionable: true
    }
  ]);

  const [stressFactors, setStressFactors] = useState<StressFactorType[]>([
    { factor: 'Academic Pressure', percentage: 65 },
    { factor: 'Sleep Quality', percentage: 45 },
    { factor: 'Social Stress', percentage: 30 },
    { factor: 'Physical Health', percentage: 20 }
  ]);

  // Generate calendar days for current week
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentDay = today.getDay(); // 0-6 (Sunday-Saturday)
    
    // Calculate the first day of the current week (Sunday)
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - currentDay);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      
      const dayStr = day.toISOString().split('T')[0];
      const moodEntry = moodHistory.find(entry => entry.date === dayStr);
      
      days.push({
        date: day,
        dayOfMonth: day.getDate(),
        dayOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
        filled: !!moodEntry,
        mood: moodEntry?.mood,
        stressLevel: moodEntry?.stressLevel
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const streak = 5; // Mock streak data
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Action handlers
  const handleInsightAction = (id: string) => {
    console.log(`Taking action on insight ${id}`);
    // In a real app, this would navigate to a specific page or show a modal with more details
  };

  // Get the insight icon based on type
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return '✅';
      case 'warning': return '⚠️';
      case 'neutral': return 'ℹ️';
      default: return '🔍';
    }
  };

  return (
    <div style={dashboardStyles.container}>
      <h1 style={dashboardStyles.greeting}>Hello, Alex</h1>
      <p style={dashboardStyles.date}>{formattedDate}</p>
      
      <div style={dashboardStyles.grid}>
        {/* Mood Tracker Prompt */}
        <div style={dashboardStyles.moodTrackerPrompt} className="tap-effect">
          <div style={dashboardStyles.moodTrackerIcon}>📝</div>
          <div style={dashboardStyles.moodTrackerText}>
            <div style={dashboardStyles.moodTrackerTitle}>Track your mood today</div>
            <div style={dashboardStyles.moodTrackerSubtitle}>How are you feeling right now?</div>
          </div>
          <Link href="/mood-tracker" style={dashboardStyles.moodTrackerButton} className="tap-effect">
            Log
          </Link>
        </div>
        
        {/* Streak Card */}
        <div style={dashboardStyles.streakCard} className="tap-effect">
          <div style={dashboardStyles.streakIcon}>🔥</div>
          <div style={dashboardStyles.streakInfo}>
            <div style={dashboardStyles.streakCount}>{streak} Day Streak</div>
            <div style={dashboardStyles.streakText}>
              You've logged your mood for 5 days in a row. Keep going!
            </div>
          </div>
        </div>
        
        {/* Mood Overview Card */}
        <div style={dashboardStyles.card}>
          <div style={dashboardStyles.cardHeader}>
            <h2 style={dashboardStyles.cardTitle}>Weekly Mood</h2>
          </div>
          
          <div style={dashboardStyles.calendarLabel}>
            {calendarDays.map((day, index) => (
              <div key={`label-${index}`} style={dashboardStyles.dayLabel}>
                {day.dayOfWeek}
              </div>
            ))}
          </div>
          
          <div style={dashboardStyles.moodCalendar}>
            {calendarDays.map((day, index) => (
              <div 
                key={`day-${index}`}
                style={{
                  ...dashboardStyles.calendarDay,
                  ...(day.filled ? dashboardStyles.calendarDayFilled : dashboardStyles.calendarDayEmpty),
                  ...(day.date.toDateString() === new Date().toDateString() 
                    ? { boxShadow: '0 0 0 2px var(--theme-blue)' } 
                    : {})
                }}
                className="tap-effect"
              >
                {day.mood && (
                  <span style={dashboardStyles.calendarDayMood}>{day.mood}</span>
                )}
                <span style={dashboardStyles.calendarDayDate}>{day.dayOfMonth}</span>
              </div>
            ))}
          </div>
        </div>
        
        <h2 style={dashboardStyles.sectionHeader}>AI Insights</h2>
        
        {/* AI Insights Section */}
        <div style={{
          ...dashboardStyles.insightsList,
          display: 'grid',
          gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : '1fr',
          gap: '0.75rem'
        }}>
          {insights.map(insight => (
            <div 
              key={insight.id}
              style={{
                ...dashboardStyles.insight,
                ...(insight.type === 'positive' ? dashboardStyles.insightPositive :
                   insight.type === 'neutral' ? dashboardStyles.insightNeutral :
                   dashboardStyles.insightWarning)
              }}
              className="tap-effect"
            >
              <div style={dashboardStyles.insightHeader}>
                <div style={dashboardStyles.insightIcon}>
                  {getInsightIcon(insight.type)}
                </div>
                <div style={dashboardStyles.insightInfo}>
                  <h3 style={dashboardStyles.insightTitle}>{insight.title}</h3>
                  <p style={dashboardStyles.insightContent}>{insight.content}</p>
                </div>
              </div>
              {insight.actionable && (
                <button 
                  style={dashboardStyles.insightActionButton}
                  onClick={() => handleInsightAction(insight.id)}
                  className="tap-effect"
                >
                  View Tips
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : '1fr',
          gap: '1rem'
        }}>
          <div>
            <h2 style={dashboardStyles.sectionHeader}>Stress Factors</h2>
            <div style={dashboardStyles.stressFactorList}>
              {stressFactors.map((factor, index) => (
                <div key={index} style={dashboardStyles.stressFactor}>
                  <div style={dashboardStyles.stressFactorHeader}>
                    <span style={dashboardStyles.stressFactorName}>{factor.factor}</span>
                    <span style={dashboardStyles.stressFactorValue}>{factor.percentage}%</span>
                  </div>
                  <div style={dashboardStyles.progressBar}>
                    <div 
                      style={{
                        ...dashboardStyles.progressBarFill,
                        width: `${factor.percentage}%`,
                        backgroundColor: factor.percentage > 60 
                          ? 'var(--theme-red)' // red for high stress
                          : factor.percentage > 40 
                          ? 'var(--theme-orange)' // orange for medium stress
                          : 'var(--theme-green)' // green for low stress
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 style={dashboardStyles.sectionHeader}>Upcoming Challenges</h2>
            <div style={dashboardStyles.challengesList}>
              <div style={dashboardStyles.challenge} className="tap-effect">
                <div style={dashboardStyles.challengeIcon}>🧘‍♂️</div>
                <div style={dashboardStyles.challengeDetails}>
                  <div style={dashboardStyles.challengeTitle}>Morning Meditation</div>
                  <div style={dashboardStyles.challengeDescription}>
                    Complete a 5-minute meditation to start your day
                  </div>
                </div>
              </div>
              
              <div style={dashboardStyles.challenge} className="tap-effect">
                <div style={dashboardStyles.challengeIcon}>📵</div>
                <div style={dashboardStyles.challengeDetails}>
                  <div style={dashboardStyles.challengeTitle}>Digital Detox</div>
                  <div style={dashboardStyles.challengeDescription}>
                    Spend 2 hours without checking social media
                  </div>
                </div>
              </div>
              
              <div style={dashboardStyles.challenge} className="tap-effect">
                <div style={dashboardStyles.challengeIcon}>🏃‍♀️</div>
                <div style={dashboardStyles.challengeDetails}>
                  <div style={dashboardStyles.challengeTitle}>Exercise Break</div>
                  <div style={dashboardStyles.challengeDescription}>
                    Take a 15-minute exercise break between study sessions
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/challenges" style={dashboardStyles.linkButton} className="tap-effect">
              View All Challenges
            </Link>
          </div>
        </div>
      </div>
      
      {/* Add custom CSS at the end */}
      <style jsx>{`
        .tap-effect:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        a {
          text-decoration: none;
        }
        
        button:hover, a:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 