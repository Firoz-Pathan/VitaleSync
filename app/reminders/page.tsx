'use client';

import React, { useState, useEffect } from 'react';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  days: string[];
  category: 'meditation' | 'exercise' | 'hydration' | 'sleep' | 'study' | 'medication' | 'social';
  isActive: boolean;
}

const RemindersPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Form state for creating a new reminder
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    title: '',
    description: '',
    time: '08:00',
    days: [],
    category: 'meditation',
    isActive: true
  });

  const categories = [
    { id: 'meditation', label: 'Meditation', icon: '🧘‍♂️' },
    { id: 'exercise', label: 'Exercise', icon: '🏃‍♂️' },
    { id: 'hydration', label: 'Hydration', icon: '💧' },
    { id: 'sleep', label: 'Sleep', icon: '😴' },
    { id: 'study', label: 'Study', icon: '📚' },
    { id: 'medication', label: 'Medication', icon: '💊' },
    { id: 'social', label: 'Social', icon: '👥' },
  ];
  
  const weekdays = [
    { id: 'monday', label: 'Mon' },
    { id: 'tuesday', label: 'Tue' },
    { id: 'wednesday', label: 'Wed' },
    { id: 'thursday', label: 'Thu' },
    { id: 'friday', label: 'Fri' },
    { id: 'saturday', label: 'Sat' },
    { id: 'sunday', label: 'Sun' },
  ];

  // Simulated data fetch
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setReminders(mockReminders);
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredReminders = selectedCategory 
    ? reminders.filter(reminder => reminder.category === selectedCategory) 
    : reminders;

  const handleToggleReminder = (id: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => 
        reminder.id === id ? {...reminder, isActive: !reminder.isActive} : reminder
      )
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prevReminders => 
      prevReminders.filter(reminder => reminder.id !== id)
    );
  };

  const handleDayToggle = (day: string) => {
    setNewReminder(prev => {
      const days = [...prev.days];
      if (days.includes(day)) {
        return {...prev, days: days.filter(d => d !== day)};
      } else {
        return {...prev, days: [...days, day]};
      }
    });
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReminder.title.trim() === '' || newReminder.days.length === 0) {
      return;
    }
    
    const newReminderWithId: Reminder = {
      ...newReminder,
      id: `reminder-${Date.now()}`
    };
    
    setReminders(prev => [newReminderWithId, ...prev]);
    setShowCreateModal(false);
    
    // Show success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
    
    // Reset form
    setNewReminder({
      title: '',
      description: '',
      time: '08:00',
      days: [],
      category: 'meditation',
      isActive: true
    });
  };

  return (
    <div className="reminders-container">
      <header className="page-header">
        <h1>Smart Reminders</h1>
        <p className="subtitle">Set and manage your wellness reminders</p>
      </header>
      
      <div className="actions-bar">
        <div className="categories-filter">
          <button 
            className={`category-pill ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
        
        <button 
          className="create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + New Reminder
        </button>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-icon">⏰</div>
            <p>Loading your reminders...</p>
          </div>
        </div>
      ) : (
        <div className="reminders-list">
          {filteredReminders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔔</div>
              <h3>No reminders found</h3>
              <p>
                {selectedCategory
                  ? `You don't have any ${getCategoryLabel(selectedCategory)} reminders yet.`
                  : 'You don\'t have any reminders set up yet.'}
              </p>
              <button 
                className="create-btn"
                onClick={() => setShowCreateModal(true)}
              >
                Create your first reminder
              </button>
            </div>
          ) : (
            <>
              {filteredReminders.map(reminder => (
                <div 
                  key={reminder.id} 
                  className={`reminder-card ${!reminder.isActive ? 'inactive' : ''}`}
                >
                  <div className="reminder-icon">
                    {getCategoryIcon(reminder.category)}
                  </div>
                  <div className="reminder-content">
                    <h3 className="reminder-title">{reminder.title}</h3>
                    <p className="reminder-description">{reminder.description}</p>
                    <div className="reminder-details">
                      <div className="reminder-time">
                        <span className="time-icon">⏰</span> {reminder.time}
                      </div>
                      <div className="reminder-days">
                        {reminder.days.map((day, index) => (
                          <span key={day} className="day-pill">
                            {day.substring(0, 3)}
                            {index < reminder.days.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="reminder-actions">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={reminder.isActive}
                        onChange={() => handleToggleReminder(reminder.id)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      
      {/* Create Reminder Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setShowCreateModal(false)}
            >
              ×
            </button>
            <div className="modal-header">
              <h2>Create New Reminder</h2>
            </div>
            <form onSubmit={handleCreateReminder}>
              <div className="form-group">
                <label htmlFor="reminder-title">Title</label>
                <input 
                  id="reminder-title"
                  type="text"
                  placeholder="e.g., Morning Meditation"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="reminder-description">Description (optional)</label>
                <textarea 
                  id="reminder-description"
                  placeholder="e.g., 10 minutes of mindfulness meditation"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="reminder-category">Category</label>
                <select 
                  id="reminder-category"
                  value={newReminder.category}
                  onChange={(e) => setNewReminder({...newReminder, category: e.target.value as any})}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="reminder-time">Time</label>
                <input 
                  id="reminder-time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Repeat on days</label>
                <div className="weekdays-selector">
                  {weekdays.map(day => (
                    <button
                      key={day.id}
                      type="button"
                      className={`day-button ${newReminder.days.includes(day.id) ? 'selected' : ''}`}
                      onClick={() => handleDayToggle(day.id)}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
                {newReminder.days.length === 0 && (
                  <p className="form-error">Please select at least one day</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={newReminder.title.trim() === '' || newReminder.days.length === 0}
              >
                Create Reminder
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="success-toast">
          <div className="toast-icon">✅</div>
          <div className="toast-message">Reminder created successfully!</div>
        </div>
      )}
      
      <style jsx>{`
        .reminders-container {
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
        
        .actions-bar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        @media (min-width: 640px) {
          .actions-bar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        
        .categories-filter {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
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
        
        .create-btn {
          padding: 0.75rem 1.25rem;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all var(--transition-fast);
        }
        
        .create-btn:hover {
          background-color: var(--primary-dark);
          transform: translateY(-1px);
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
          animation: tilt 2s infinite alternate;
        }
        
        @keyframes pulse {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }
        
        @keyframes tilt {
          0% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }
        
        .reminders-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .reminder-card {
          display: flex;
          align-items: center;
          padding: 1rem;
          background-color: var(--card-background);
          border-radius: var(--radius-lg);
          border: 1px solid var(--gray-200);
          transition: all var(--transition-normal);
        }
        
        .reminder-card.inactive {
          opacity: 0.6;
        }
        
        .reminder-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-right: 1rem;
          flex-shrink: 0;
          transition: background-color var(--transition-normal);
        }
        
        .reminder-content {
          flex: 1;
        }
        
        .reminder-title {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .reminder-description {
          margin: 0 0 0.5rem;
          font-size: 0.9rem;
          color: var(--gray-600);
          transition: color var(--transition-normal);
        }
        
        .reminder-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--gray-600);
          transition: color var(--transition-normal);
        }
        
        .reminder-time {
          display: flex;
          align-items: center;
        }
        
        .time-icon {
          margin-right: 0.25rem;
        }
        
        .reminder-days {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }
        
        .day-pill {
          font-size: 0.85rem;
          color: var(--gray-600);
          transition: color var(--transition-normal);
        }
        
        .reminder-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: 1rem;
        }
        
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--gray-300);
          transition: .4s;
          border-radius: 34px;
        }
        
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
          background-color: var(--primary);
        }
        
        input:focus + .toggle-slider {
          box-shadow: 0 0 1px var(--primary);
        }
        
        input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }
        
        .delete-btn {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity var(--transition-fast);
        }
        
        .delete-btn:hover {
          opacity: 1;
        }
        
        .empty-state {
          padding: 3rem 1rem;
          text-align: center;
          border: 2px dashed var(--gray-300);
          border-radius: var(--radius-lg);
          margin: 2rem 0;
          transition: border-color var(--transition-normal);
        }
        
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: tilt 2s infinite alternate;
        }
        
        .empty-state h3 {
          margin: 0 0 0.5rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .empty-state p {
          margin: 0 0 1.5rem;
          color: var(--gray-600);
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
          margin-bottom: 1.5rem;
        }
        
        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .form-group {
          margin-bottom: 1.25rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--foreground);
          transition: color var(--transition-normal);
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--gray-300);
          border-radius: 8px;
          background-color: var(--background);
          color: var(--foreground);
          font-size: 1rem;
          transition: all var(--transition-fast);
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(79, 124, 172, 0.2);
        }
        
        .weekdays-selector {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .day-button {
          padding: 0.5rem;
          min-width: 3rem;
          background-color: var(--gray-100);
          border: 1px solid var(--gray-300);
          border-radius: 8px;
          color: var(--gray-700);
          transition: all var(--transition-fast);
        }
        
        .day-button.selected {
          background-color: var(--primary);
          border-color: var(--primary);
          color: white;
        }
        
        .form-error {
          margin-top: 0.5rem;
          color: var(--theme-error);
          font-size: 0.85rem;
        }
        
        .submit-btn {
          width: 100%;
          padding: 0.75rem;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        
        .submit-btn:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .success-toast {
          position: fixed;
          bottom: calc(var(--app-footer-height) + 1rem);
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(76, 175, 80, 0.95);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          animation: toastIn 0.3s, fadeOut 0.5s 2.5s;
        }
        
        .toast-icon {
          font-size: 1.25rem;
        }
        
        .toast-message {
          font-weight: 500;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes toastIn {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Helper functions
const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'meditation': return 'Meditation';
    case 'exercise': return 'Exercise';
    case 'hydration': return 'Hydration';
    case 'sleep': return 'Sleep';
    case 'study': return 'Study';
    case 'medication': return 'Medication';
    case 'social': return 'Social';
    default: return '';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'meditation': return '🧘‍♂️';
    case 'exercise': return '🏃‍♂️';
    case 'hydration': return '💧';
    case 'sleep': return '😴';
    case 'study': return '📚';
    case 'medication': return '💊';
    case 'social': return '👥';
    default: return '🔔';
  }
};

// Mock data
const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: '10 minutes mindfulness meditation',
    time: '07:30',
    days: ['monday', 'wednesday', 'friday'],
    category: 'meditation',
    isActive: true
  },
  {
    id: '2',
    title: 'Hydration Reminder',
    description: 'Drink a glass of water',
    time: '11:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    category: 'hydration',
    isActive: true
  },
  {
    id: '3',
    title: 'Evening Workout',
    description: '30 minutes of exercise',
    time: '18:00',
    days: ['tuesday', 'thursday'],
    category: 'exercise',
    isActive: false
  },
  {
    id: '4',
    title: 'Bedtime Reminder',
    description: 'Prepare for sleep - avoid screens',
    time: '22:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    category: 'sleep',
    isActive: true
  }
];

export default RemindersPage;