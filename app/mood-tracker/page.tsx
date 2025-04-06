'use client';

import React, { useState, useEffect } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';

interface MoodOption {
  value: string;
  label: string;
  emoji: string;
  color: string;
}

interface ActivityOption {
  id: string;
  label: string;
  icon: string;
}

interface MoodEntry {
  id: string;
  date: Date;
  mood: string;
  stressLevel: number;
  activities: string[];
  note?: string;
}

const MoodTracker: React.FC = () => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState<string>('');
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [showAIInsights, setShowAIInsights] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animateSubmit, setAnimateSubmit] = useState<boolean>(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { 
      id: '1', 
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), 
      mood: 'great',
      stressLevel: 2, 
      activities: ['exercise', 'meditation'] 
    },
    { 
      id: '2', 
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 
      mood: 'okay',
      stressLevel: 5, 
      activities: ['study'] 
    },
    { 
      id: '3', 
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), 
      mood: 'sad',
      stressLevel: 7, 
      activities: ['poorSleep', 'study'] 
    },
    { 
      id: '4', 
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 
      mood: 'great',
      stressLevel: 3, 
      activities: ['exercise', 'social'] 
    },
    { 
      id: '5', 
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
      mood: 'good',
      stressLevel: 4, 
      activities: ['meditation'] 
    },
    { 
      id: '6', 
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 
      mood: 'terrible',
      stressLevel: 9, 
      activities: ['poorSleep', 'study'] 
    }
  ]);

  const moods: MoodOption[] = [
    { value: 'great', label: 'Great', emoji: '😁', color: '#4caf50' },
    { value: 'good', label: 'Good', emoji: '🙂', color: '#8bc34a' },
    { value: 'okay', label: 'Okay', emoji: '😐', color: '#ffc107' },
    { value: 'sad', label: 'Sad', emoji: '😔', color: '#ff9800' },
    { value: 'terrible', label: 'Terrible', emoji: '😫', color: '#f44336' }
  ];

  const activities: ActivityOption[] = [
    { id: 'exercise', label: 'Exercise', icon: '🏋️' },
    { id: 'study', label: 'Study', icon: '📚' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'meditation', label: 'Meditation', icon: '🧘' },
    { id: 'goodSleep', label: 'Good Sleep', icon: '😴' },
    { id: 'poorSleep', label: 'Poor Sleep', icon: '🛌' },
    { id: 'healthy-eating', label: 'Healthy Food', icon: '🥗' },
    { id: 'reading', label: 'Reading', icon: '📖' },
    { id: 'gaming', label: 'Gaming', icon: '🎮' }
  ];

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
  };

  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities(prev => {
      if (prev.includes(activityId)) {
        return prev.filter(id => id !== activityId);
      } else {
        return [...prev, activityId];
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    setAnimateSubmit(true);
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const newEntry: MoodEntry = {
        id: (moodHistory.length + 1).toString(),
        date: new Date(),
        mood: selectedMood,
        stressLevel,
        activities: selectedActivities,
        note: moodNote
      };
      
      setMoodHistory([...moodHistory, newEntry]);
      setShowAIInsights(true);
      setIsLoading(false);
      
      // Reset form after 1 second
      setTimeout(() => {
        setAnimateSubmit(false);
        setSelectedMood(null);
        setMoodNote('');
        setStressLevel(5);
        setSelectedActivities([]);
      }, 1000);
    }, 2000);
  };
  
  // Get the selected mood object
  const selectedMoodObj = moods.find(mood => mood.value === selectedMood);
  
  // Generate weekly mood chart data
  const generateWeeklyMoodData = () => {
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });
    
    return lastSevenDays.map(date => {
      const formattedDate = date.toISOString().split('T')[0];
      const entry = moodHistory.find(e => 
        e.date.toISOString().split('T')[0] === formattedDate
      );
      
      const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      const moodValue = entry ? 
        moods.findIndex(m => m.value === entry.mood) :
        -1;
      
      return {
        date,
        dayLabel,
        entry,
        moodValue: moodValue >= 0 ? moods.length - moodValue : null
      };
    });
  };
  
  // Generate insights based on mood history
  const generateInsights = () => {
    // Analyze activities and mood correlations
    const activityCorrelations: Record<string, { count: number, moodSum: number }> = {};
    
    moodHistory.forEach(entry => {
      const moodValue = moods.findIndex(m => m.value === entry.mood);
      const normalizedMoodValue = moods.length - moodValue; // Invert so higher is better
      
      entry.activities.forEach(activity => {
        if (!activityCorrelations[activity]) {
          activityCorrelations[activity] = { count: 0, moodSum: 0 };
        }
        
        activityCorrelations[activity].count++;
        activityCorrelations[activity].moodSum += normalizedMoodValue;
      });
    });
    
    // Calculate average mood for each activity
    const activityMoodScores = Object.entries(activityCorrelations)
      .map(([activity, { count, moodSum }]) => ({
        activity,
        averageMood: moodSum / count,
        count
      }))
      .sort((a, b) => b.averageMood - a.averageMood);
    
    const insights = [];
    
    // Only generate insights if we have enough data
    if (moodHistory.length >= 3) {
      // Top positive activity
      if (activityMoodScores.length > 0) {
        const topActivity = activityMoodScores[0];
        const activityLabel = activities.find(a => a.id === topActivity.activity)?.label || topActivity.activity;
        insights.push(`${activityLabel} seems to boost your mood the most.`);
      }
      
      // Recent mood trend
      const recentEntries = [...moodHistory].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3);
      const recentMoods = recentEntries.map(entry => {
        const moodValue = moods.findIndex(m => m.value === entry.mood);
        return moods.length - moodValue; // Invert so higher is better
      });
      
      const averageRecentMood = recentMoods.reduce((sum, val) => sum + val, 0) / recentMoods.length;
      const moodTrend = recentMoods[0] > recentMoods[recentMoods.length - 1] ? 'improving' : 'declining';
      
      if (averageRecentMood > 3) {
        insights.push(`Your mood has been generally positive lately.`);
      } else if (averageRecentMood < 2) {
        insights.push(`You've been feeling down recently. Consider trying activities that have helped your mood in the past.`);
      }
      
      // Stress level insights
      const averageStress = moodHistory.reduce((sum, entry) => sum + entry.stressLevel, 0) / moodHistory.length;
      if (averageStress > 7) {
        insights.push(`Your stress levels have been high. Try incorporating more meditation or exercise.`);
      }
      
      // Social activity impact
      const socialEntries = moodHistory.filter(entry => entry.activities.includes('social'));
      if (socialEntries.length > 0) {
        const socialMoodAvg = socialEntries.reduce((sum, entry) => {
          const moodValue = moods.findIndex(m => m.value === entry.mood);
          return sum + (moods.length - moodValue);
        }, 0) / socialEntries.length;
        
        const nonSocialEntries = moodHistory.filter(entry => !entry.activities.includes('social'));
        const nonSocialMoodAvg = nonSocialEntries.length > 0 ? 
          nonSocialEntries.reduce((sum, entry) => {
            const moodValue = moods.findIndex(m => m.value === entry.mood);
            return sum + (moods.length - moodValue);
          }, 0) / nonSocialEntries.length : 0;
        
        if (socialMoodAvg > nonSocialMoodAvg + 1) {
          insights.push(`Social activities appear to significantly improve your mood.`);
        }
      }
    } else {
      insights.push(`Continue logging your moods to receive personalized insights.`);
    }
    
    return insights;
  };
  
  // Weekly mood chart data
  const weeklyMoodData = generateWeeklyMoodData();
  
  // AI insights
  const aiInsights = generateInsights();

  return (
    <div className="container">
      <h1 className="slide-up" style={{ 
        fontSize: '1.75rem', 
        fontWeight: 'bold', 
        marginBottom: '1.5rem',
        animationDelay: '0.1s'
      }}>
        Mood Tracker
      </h1>
      
      <div className="card slide-up" style={{ 
        marginBottom: '1.5rem',
        animationDelay: '0.2s'
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem' 
        }}>
          Weekly Mood
        </h2>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end',
          height: '160px',
          marginBottom: '1rem',
          padding: '0 0.5rem'
        }}>
          {weeklyMoodData.map((day, index) => {
            const moodEntry = day.entry;
            const moodObj = moodEntry ? moods.find(m => m.value === moodEntry.mood) : null;
            
            return (
              <div 
                key={index} 
                style={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  height: '100%',
                  justifyContent: 'flex-end'
                }}
              >
                {moodEntry ? (
                  <div 
                    style={{ 
                      width: '100%',
                      maxWidth: '40px',
                      height: `${(day.moodValue || 0) * 20}px`,
                      backgroundColor: moodObj?.color || '#e0e0e0',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.5s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '1.25rem'
                      }}
                    >
                      {moodObj?.emoji}
                    </div>
                  </div>
                ) : (
                  <div 
                    style={{ 
                      width: '100%',
                      maxWidth: '40px',
                      height: '20px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '4px 4px 0 0',
                      opacity: 0.5
                    }}
                  ></div>
                )}
                
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--gray-600)',
                  fontWeight: day.date.toDateString() === new Date().toDateString() ? 'bold' : 'normal'
                }}>
                  {day.dayLabel}
                </div>
              </div>
            );
          })}
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '1rem',
          marginTop: '0.5rem'
        }}>
          {moods.map((mood, index) => (
            <div 
              key={mood.value} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem', 
                fontSize: '0.8rem',
                color: 'var(--gray-600)'
              }}
            >
              <span style={{ 
                display: 'inline-block', 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: mood.color 
              }}></span>
              <span>{mood.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {showAIInsights ? (
        <div className="card slide-up" style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem', 
            gap: '0.5rem' 
          }}>
            <div style={{ 
              fontSize: '1.5rem',
              color: 'var(--primary)'
            }}>
              💡
            </div>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              margin: 0 
            }}>
              AI Insights
            </h2>
          </div>
          
          {aiInsights.map((insight, index) => (
            <p key={index} style={{
              fontSize: '0.9rem',
              lineHeight: '1.4',
              marginBottom: index === aiInsights.length - 1 ? 0 : '0.75rem',
              paddingLeft: '2rem',
              position: 'relative'
            }}>
              <span style={{ 
                position: 'absolute', 
                left: '0', 
                top: '0',
                fontSize: '1rem',
                color: 'var(--primary)'
              }}>•</span>
              {insight}
            </p>
          ))}
          
          <div style={{ 
            marginTop: '1.5rem', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <button 
              onClick={() => setShowAIInsights(false)} 
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="tap-effect"
            >
              Log New Mood
            </button>
          </div>
        </div>
      ) : (
        <div className={`card slide-up ${animateSubmit ? 'submit-success' : ''}`} style={{ 
          marginBottom: '1.5rem',
          animationDelay: '0.3s',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem' 
          }}>
            How are you feeling today?
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: isTablet ? 'center' : 'space-between',
            flexWrap: 'wrap',
            gap: isTablet ? '1.5rem' : '0.5rem',
            marginBottom: '1.5rem'
          }}>
            {moods.map(mood => (
              <div 
                key={mood.value}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: selectedMood === mood.value ? `${mood.color}20` : 'transparent',
                  border: selectedMood === mood.value ? `2px solid ${mood.color}` : '2px solid transparent',
                  transform: selectedMood === mood.value ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => handleMoodSelect(mood.value)}
                className="tap-effect"
              >
                <span style={{
                  fontSize: '2rem',
                  marginBottom: '0.25rem'
                }}>
                  {mood.emoji}
                </span>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: selectedMood === mood.value ? 'bold' : 'normal',
                  color: selectedMood === mood.value ? mood.color : 'var(--gray-700)'
                }}>
                  {mood.label}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Stress Level
            </label>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem' 
            }}>
              <span style={{ 
                fontSize: '0.9rem', 
                color: 'var(--theme-success)', 
                width: '60px',
                textAlign: 'center'
              }}>
                Low
              </span>
              
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={stressLevel} 
                onChange={(e) => setStressLevel(Number(e.target.value))}
                style={{
                  flex: 1,
                  height: '8px',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  backgroundColor: 'var(--gray-200)',
                  borderRadius: '4px',
                  outline: 'none',
                  accentColor: stressLevel > 7 ? 'var(--theme-error)' : 
                               stressLevel > 4 ? 'var(--theme-warning)' : 
                               'var(--theme-success)'
                }}
              />
              
              <span style={{ 
                fontSize: '0.9rem', 
                color: 'var(--theme-error)', 
                width: '60px',
                textAlign: 'center'
              }}>
                High
              </span>
            </div>
            <div style={{ 
              textAlign: 'center', 
              fontSize: '1.25rem', 
              fontWeight: 'bold',
              marginTop: '0.5rem',
              color: stressLevel > 7 ? 'var(--theme-error)' : 
                     stressLevel > 4 ? 'var(--theme-warning)' : 
                     'var(--theme-success)'
            }}>
              {stressLevel}
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontWeight: '500'
            }}>
              What did you do today?
            </label>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isTablet ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
              gap: '0.75rem'
            }}>
              {activities.map(activity => (
                <div 
                  key={activity.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.75rem 0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--gray-200)',
                    backgroundColor: selectedActivities.includes(activity.id) ? 'var(--primary-light)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onClick={() => handleActivityToggle(activity.id)}
                  className="tap-effect"
                >
                  <span style={{ fontSize: '1.5rem' }}>{activity.icon}</span>
                  <span style={{ 
                    fontSize: '0.8rem',
                    fontWeight: selectedActivities.includes(activity.id) ? 'bold' : 'normal',
                    color: selectedActivities.includes(activity.id) ? 'var(--primary)' : 'var(--gray-700)',
                    textAlign: 'center'
                  }}>
                    {activity.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Any notes about your day?
            </label>
            <textarea 
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="Optional: Write any thoughts or notes about your day..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--gray-300)',
                minHeight: '80px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={!selectedMood || isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: selectedMood ? 'var(--primary)' : 'var(--gray-300)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: selectedMood ? 'pointer' : 'not-allowed',
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            className={selectedMood ? "tap-effect" : ""}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : (
              'Save Mood'
            )}
          </button>
          
          {/* Success overlay */}
          <div className={`submit-success-overlay ${animateSubmit ? 'show' : ''}`}>
            <div className="success-checkmark">✓</div>
            <div className="success-message">Mood Saved!</div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .submit-success {
          transition: transform 0.3s ease;
        }
        
        .submit-success-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease;
          z-index: 1;
        }
        
        .submit-success-overlay.show {
          opacity: 1;
          visibility: visible;
        }
        
        .success-checkmark {
          width: 60px;
          height: 60px;
          background-color: var(--theme-success);
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1rem;
          transform: scale(0);
          animation: checkmark-scale 0.5s forwards;
        }
        
        .success-message {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--theme-success);
          opacity: 0;
          animation: message-fade 0.5s 0.3s forwards;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes checkmark-scale {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes message-fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .mood-chart {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          margin-top: 20px;
        }
        
        .mood-day {
          position: relative;
          height: 100px;
          border-radius: 8px;
          background-color: var(--card-background);
          border: 1px solid var(--gray-200);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .mood-day-header {
          position: absolute;
          top: 0;
          width: 100%;
          padding: 8px 0;
          text-align: center;
          border-radius: 8px 8px 0 0;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--foreground);
          background-color: var(--gray-100);
          transition: background-color var(--transition-normal), color var(--transition-normal);
        }
        
        .mood-day-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 30px;
        }
        
        .mood-emoji {
          font-size: 1.8rem;
          margin-bottom: 5px;
        }
        
        .mood-date {
          font-size: 0.8rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .active-day {
          border: 2px solid var(--primary);
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
};

export default MoodTracker; 