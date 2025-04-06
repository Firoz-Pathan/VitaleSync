'use client';

import React, { useState, useEffect } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';

interface Challenge {
  id: string;
  title: string;
  description: string;
  pointsValue: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  icon: string;
  dueDate?: string;
}

const challengesStyles = {
  container: {
    padding: '12px',
    height: '100%',
    overflowY: 'auto' as const,
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    paddingLeft: '0.5rem',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '1.25rem',
    backgroundColor: 'var(--background)',
    borderRadius: 'var(--app-border-radius)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid var(--gray-200)',
    padding: '1rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: 'var(--theme-blue)',
    marginBottom: '0.25rem',
  },
  statLabel: {
    color: 'var(--gray-600)',
    fontSize: '0.8rem',
  },
  filtersContainer: {
    marginBottom: '1rem',
  },
  filtersScroll: {
    display: 'flex',
    overflowX: 'auto' as const,
    gap: '0.5rem',
    padding: '0.5rem 0',
  },
  filterButton: {
    padding: '0.5rem 0.85rem',
    borderRadius: '50px',
    border: '1px solid var(--gray-300)',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap' as const,
    fontWeight: '500',
  },
  filterButtonActive: {
    backgroundColor: 'var(--theme-blue)',
    color: 'white',
    border: '1px solid var(--theme-blue)',
  },
  challengesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.85rem',
  },
  challengeCard: {
    backgroundColor: 'var(--background)',
    borderRadius: 'var(--app-border-radius)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid var(--gray-200)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  challengeCompleted: {
    borderColor: 'var(--theme-green)',
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
  },
  challengeHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
    gap: '0.75rem',
  },
  challengeIconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(94, 106, 210, 0.1)',
    fontSize: '1.25rem',
    flexShrink: 0,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  challengeDescription: {
    fontSize: '0.85rem',
    color: 'var(--gray-600)',
    marginBottom: '0.75rem',
    lineHeight: '1.4',
  },
  challengeFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  challengeBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '500',
    backgroundColor: 'var(--gray-100)',
    color: 'var(--gray-600)',
  },
  challengePointsValue: {
    fontWeight: 'bold',
    color: 'var(--theme-green)',
    fontSize: '0.9rem',
  },
  completeButton: {
    padding: '0.5rem 0.85rem',
    backgroundColor: 'var(--theme-blue)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  completedBadge: {
    position: 'absolute' as const,
    top: '0.85rem',
    right: '0.85rem',
    backgroundColor: 'var(--theme-green)',
    color: 'white',
    padding: '0.2rem 0.5rem',
    borderRadius: '50px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: '1.25rem',
    backgroundColor: 'var(--background)',
    borderRadius: 'var(--app-border-radius)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid var(--gray-200)',
    padding: '1rem',
  },
  progressHeading: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: '0.85rem',
    color: 'var(--gray-600)',
  },
  progressBarOuter: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--gray-200)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: 'var(--theme-blue)',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
};

const difficultyColors = {
  easy: 'var(--theme-green)',
  medium: 'var(--theme-orange)',
  hard: 'var(--theme-red)',
};

const Challenges: React.FC = () => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [filter, setFilter] = useState<string>('all');
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Complete a 5-minute morning meditation session to start your day positively.',
      pointsValue: 10,
      category: 'mindfulness',
      difficulty: 'easy',
      completed: false,
      icon: '🧘‍♂️'
    },
    {
      id: '2',
      title: 'Exercise Break',
      description: 'Take a 15-minute exercise break between study sessions.',
      pointsValue: 15,
      category: 'physical',
      difficulty: 'medium',
      completed: false,
      icon: '🏃‍♀️'
    },
    {
      id: '3',
      title: 'Digital Detox',
      description: 'Spend 2 hours without checking social media or email.',
      pointsValue: 20,
      category: 'digital',
      difficulty: 'hard',
      completed: false,
      icon: '📵'
    },
    {
      id: '4',
      title: 'Gratitude Journal',
      description: 'Write down 3 things you are grateful for today.',
      pointsValue: 10,
      category: 'mindfulness',
      difficulty: 'easy',
      completed: true,
      icon: '📔'
    },
    {
      id: '5',
      title: 'Healthy Meal',
      description: 'Prepare and eat a balanced, nutritious meal.',
      pointsValue: 15,
      category: 'nutrition',
      difficulty: 'medium',
      completed: false,
      icon: '🥗'
    },
    {
      id: '6',
      title: 'Early Bedtime',
      description: 'Go to bed before 11 PM for a full night of rest.',
      pointsValue: 10,
      category: 'sleep',
      difficulty: 'easy',
      completed: false,
      icon: '🛌'
    }
  ]);

  const totalPoints = challenges.reduce((sum, challenge) => 
    challenge.completed ? sum + challenge.pointsValue : sum, 0);
  
  const completedChallenges = challenges.filter(challenge => challenge.completed).length;
  const completionPercentage = (completedChallenges / challenges.length) * 100;
  const currentStreak = 3; // This would typically be calculated from user data
  
  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === filter);

  const handleCompleteChallenge = (id: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id ? { ...challenge, completed: true } : challenge
    ));
  };

  // Update the grid template columns based on screen size
  const gridTemplateColumns = isDesktop 
    ? 'repeat(3, 1fr)' 
    : isTablet 
    ? 'repeat(2, 1fr)' 
    : '1fr';

  return (
    <div style={challengesStyles.container}>
      <h1 style={challengesStyles.heading}>Challenges</h1>
      
      <div style={challengesStyles.stats}>
        <div style={challengesStyles.statItem}>
          <div style={challengesStyles.statValue}>{totalPoints}</div>
          <div style={challengesStyles.statLabel}>Points</div>
        </div>
        <div style={challengesStyles.statItem}>
          <div style={challengesStyles.statValue}>{currentStreak}</div>
          <div style={challengesStyles.statLabel}>Day Streak</div>
        </div>
        <div style={challengesStyles.statItem}>
          <div style={challengesStyles.statValue}>{completedChallenges}</div>
          <div style={challengesStyles.statLabel}>Completed</div>
        </div>
      </div>

      <div style={challengesStyles.progressContainer}>
        <h2 style={challengesStyles.progressHeading}>Daily Progress</h2>
        <div style={challengesStyles.progressLabel}>
          <span>Challenges completed</span>
          <span>{completedChallenges} of {challenges.length} ({completionPercentage.toFixed(0)}%)</span>
        </div>
        <div style={challengesStyles.progressBarOuter}>
          <div 
            style={{
              ...challengesStyles.progressBarInner, 
              width: `${completionPercentage}%`
            }}
          ></div>
        </div>
      </div>
      
      <div style={challengesStyles.filtersContainer}>
        <div style={challengesStyles.filtersScroll} className="no-scrollbar">
          <button 
            style={{
              ...challengesStyles.filterButton,
              ...(filter === 'all' ? challengesStyles.filterButtonActive : {})
            }}
            onClick={() => setFilter('all')}
            className="tap-effect"
          >
            All Challenges
          </button>
          <button 
            style={{
              ...challengesStyles.filterButton,
              ...(filter === 'mindfulness' ? challengesStyles.filterButtonActive : {})
            }}
            onClick={() => setFilter('mindfulness')}
            className="tap-effect"
          >
            Mindfulness
          </button>
          <button 
            style={{
              ...challengesStyles.filterButton,
              ...(filter === 'physical' ? challengesStyles.filterButtonActive : {})
            }}
            onClick={() => setFilter('physical')}
            className="tap-effect"
          >
            Physical
          </button>
          <button 
            style={{
              ...challengesStyles.filterButton,
              ...(filter === 'nutrition' ? challengesStyles.filterButtonActive : {})
            }}
            onClick={() => setFilter('nutrition')}
            className="tap-effect"
          >
            Nutrition
          </button>
          <button 
            style={{
              ...challengesStyles.filterButton,
              ...(filter === 'sleep' ? challengesStyles.filterButtonActive : {})
            }}
            onClick={() => setFilter('sleep')}
            className="tap-effect"
          >
            Sleep
          </button>
          <button 
            style={{
              ...challengesStyles.filterButton,
              ...(filter === 'digital' ? challengesStyles.filterButtonActive : {})
            }}
            onClick={() => setFilter('digital')}
            className="tap-effect"
          >
            Digital
          </button>
        </div>
      </div>
      
      <div style={{
        ...challengesStyles.challengesGrid,
        gridTemplateColumns
      }}>
        {filteredChallenges.map(challenge => (
          <div 
            key={challenge.id} 
            style={{
              ...challengesStyles.challengeCard,
              ...(challenge.completed ? challengesStyles.challengeCompleted : {})
            }}
            className="tap-effect"
          >
            {challenge.completed && (
              <div style={challengesStyles.completedBadge}>Completed</div>
            )}
            <div style={challengesStyles.challengeHeader}>
              <div 
                style={{
                  ...challengesStyles.challengeIconContainer,
                  backgroundColor: challenge.difficulty === 'easy' 
                    ? 'rgba(76, 175, 80, 0.1)' 
                    : challenge.difficulty === 'medium' 
                    ? 'rgba(255, 152, 0, 0.1)'
                    : 'rgba(244, 67, 54, 0.1)',
                }}
              >
                {challenge.icon}
              </div>
              <div style={challengesStyles.challengeInfo}>
                <h3 style={challengesStyles.challengeTitle}>{challenge.title}</h3>
                <p style={challengesStyles.challengeDescription}>{challenge.description}</p>
              </div>
            </div>
            <div style={challengesStyles.challengeFooter}>
              <div>
                <span 
                  style={{
                    ...challengesStyles.challengeBadge,
                    backgroundColor: 
                      challenge.difficulty === 'easy' 
                        ? 'rgba(76, 175, 80, 0.1)' 
                        : challenge.difficulty === 'medium' 
                        ? 'rgba(255, 152, 0, 0.1)'
                        : 'rgba(244, 67, 54, 0.1)',
                    color: difficultyColors[challenge.difficulty]
                  }}
                >
                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </span>
              </div>
              {challenge.completed ? (
                <div style={challengesStyles.challengePointsValue}>+{challenge.pointsValue} points</div>
              ) : (
                <button 
                  style={challengesStyles.completeButton}
                  onClick={() => handleCompleteChallenge(challenge.id)}
                  className="tap-effect"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;