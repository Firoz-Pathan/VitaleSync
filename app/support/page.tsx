'use client';

import React, { useState } from 'react';

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  availability: string;
  image: string;
}

interface Message {
  id: string;
  sender: 'user' | 'counselor';
  text: string;
  timestamp: string;
}

interface Appointment {
  id: string;
  counselorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const supportStyles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  heading: {
    marginBottom: '1.5rem'
  },
  section: {
    marginBottom: '2.5rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  card: {
    backgroundColor: 'var(--card-background)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-200)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
  },
  counselorHeader: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  counselorImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'var(--gray-200)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'var(--gray-600)',
    transition: 'background-color var(--transition-normal), color var(--transition-normal)'
  },
  counselorInfo: {
    flex: 1
  },
  counselorName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  counselorSpecialization: {
    fontSize: '0.9rem',
    color: 'var(--gray-600)',
    marginBottom: '0.5rem',
    transition: 'color var(--transition-normal)'
  },
  counselorAvailability: {
    fontSize: '0.8rem',
    color: 'var(--gray-600)',
    transition: 'color var(--transition-normal)'
  },
  appointmentButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '1rem',
    transition: 'background-color var(--transition-fast), transform var(--transition-fast)'
  },
  infoAlert: {
    padding: '1rem',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: '8px',
    border: '1px solid var(--primary)',
    marginBottom: '2rem',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
  },
  chatContainer: {
    backgroundColor: 'var(--card-background)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-200)',
    overflow: 'hidden',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
  },
  chatHeader: {
    padding: '1rem',
    borderBottom: '1px solid var(--gray-200)',
    backgroundColor: 'var(--gray-100)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
  },
  chatMessages: {
    padding: '1rem',
    height: '350px',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    backgroundColor: 'var(--card-background)',
    transition: 'background-color var(--transition-normal)'
  },
  message: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    maxWidth: '80%'
  },
  userMessage: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    alignSelf: 'flex-end'
  },
  counselorMessage: {
    backgroundColor: 'var(--gray-100)',
    alignSelf: 'flex-start',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), color var(--transition-normal)'
  },
  messageTime: {
    fontSize: '0.75rem',
    marginTop: '0.25rem',
    opacity: 0.8,
    textAlign: 'right' as const
  },
  chatInput: {
    display: 'flex',
    padding: '1rem',
    borderTop: '1px solid var(--gray-200)',
    backgroundColor: 'var(--card-background)',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
  },
  textarea: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '20px',
    border: '1px solid var(--gray-300)',
    fontSize: '0.9rem',
    resize: 'none' as const,
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal)'
  },
  sendButton: {
    marginLeft: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color var(--transition-fast), transform var(--transition-fast)'
  },
  resources: {
    backgroundColor: 'var(--card-background)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-200)',
    padding: '1.5rem',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
  },
  resourcesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  resourceItem: {
    padding: '1rem',
    borderBottom: '1px solid var(--gray-200)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'border-color var(--transition-normal)'
  },
  resourceIcon: {
    fontSize: '1.25rem',
    color: 'var(--primary)'
  },
  resourceLink: {
    color: 'var(--foreground)',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color var(--transition-normal)'
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    animation: 'fadeIn var(--transition-normal) ease'
  },
  modalContent: {
    backgroundColor: 'var(--card-background)',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: 'var(--shadow-lg)',
    animation: 'slideUp var(--transition-normal) ease',
    transition: 'background-color var(--transition-normal)'
  },
  modalHeader: {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--gray-600)',
    transition: 'color var(--transition-fast)'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal)'
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), color var(--transition-normal), border-color var(--transition-normal)'
  },
  saveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem'
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--gray-100)',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  appointmentsList: {
    marginTop: '2rem',
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid var(--gray-200)',
    padding: '1.5rem'
  },
  appointmentItem: {
    padding: '1rem',
    borderBottom: '1px solid var(--gray-200)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appointmentInfo: {
    flex: 1
  },
  appointmentTitle: {
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  },
  appointmentDate: {
    fontSize: '0.9rem',
    color: 'var(--gray-600)'
  },
  statusBadge: {
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  scheduledBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    color: '#2196F3'
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4CAF50'
  },
  cancelledBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    color: '#F44336'
  },
  timeSlotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  timeSlot: {
    padding: '0.5rem',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    textAlign: 'center' as const,
    cursor: 'pointer'
  },
  selectedTimeSlot: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: '1px solid var(--primary)'
  },
  disabledTimeSlot: {
    backgroundColor: 'var(--gray-100)',
    color: 'var(--gray-400)',
    cursor: 'not-allowed'
  }
};

const Support: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'counselor',
      text: 'Hi there! How can I help you today?',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'user',
      text: 'I\'ve been feeling stressed about upcoming exams.',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      sender: 'counselor',
      text: 'I understand. Exam stress is very common. Let\'s talk about some strategies that might help you manage it better.',
      timestamp: '10:33 AM'
    }
  ]);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Stress Management',
      availability: 'Mon, Wed, Fri: 9AM - 5PM',
      image: 'SJ'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Depression & Mood Disorders',
      availability: 'Tue, Thu: 10AM - 6PM',
      image: 'MC'
    },
    {
      id: '3',
      name: 'Dr. Lisa Patel',
      specialization: 'Academic Stress & Career Counseling',
      availability: 'Mon-Fri: 1PM - 5PM',
      image: 'LP'
    }
  ];

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      counselorId: '1',
      date: '2023-05-15',
      time: '10:00 AM',
      status: 'scheduled'
    },
    {
      id: '2',
      counselorId: '2',
      date: '2023-05-20',
      time: '2:00 PM',
      status: 'scheduled'
    }
  ]);

  // Appointment booking states
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: (messages.length + 1).toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate counselor response after a brief delay
    setTimeout(() => {
      const response: Message = {
        id: (messages.length + 2).toString(),
        sender: 'counselor',
        text: 'Thank you for sharing that. What specific aspects of your exams are causing you the most stress?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prevMessages => [...prevMessages, response]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTimeSlots = (counselorId: string, date: string) => {
    // In a real app, this would come from an API based on the counselor's availability
    const baseTimeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    // Filter out already booked slots
    const bookedSlots = appointments
      .filter(app => app.counselorId === counselorId && app.date === date)
      .map(app => app.time);

    return baseTimeSlots.filter(slot => !bookedSlots.includes(slot));
  };

  const handleBookAppointment = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setSelectedDate('');
    setSelectedTime('');
    setAvailableTimeSlots([]);
    setIsBooking(true);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (selectedCounselor) {
      setAvailableTimeSlots(getTimeSlots(selectedCounselor.id, date));
    }
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSaveAppointment = () => {
    if (!selectedCounselor || !selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      counselorId: selectedCounselor.id,
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled'
    };

    setAppointments([...appointments, newAppointment]);
    setIsBooking(false);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.map(app => 
      app.id === appointmentId ? {...app, status: 'cancelled'} : app
    ));
  };

  // Get counselor name by ID
  const getCounselorName = (counselorId: string) => {
    const counselor = counselors.find(c => c.id === counselorId);
    return counselor ? counselor.name : 'Unknown';
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div style={supportStyles.container}>
      <h2 style={{...supportStyles.heading, color: 'var(--foreground)', transition: 'color var(--transition-normal)'}}>
        Mental Health Support
      </h2>

      <div style={supportStyles.infoAlert}>
        <strong>Need immediate help?</strong> If you're experiencing a mental health emergency, please call the campus crisis line at <strong>555-123-4567</strong> or text HELP to 988.
      </div>
      
      <section style={supportStyles.section}>
        <h2 style={{ marginBottom: '1rem' }}>Connect with a Counselor</h2>
        <div style={supportStyles.grid}>
          {counselors.map(counselor => (
            <div key={counselor.id} style={supportStyles.card}>
              <div style={supportStyles.counselorHeader}>
                <div style={supportStyles.counselorImage}>
                  {counselor.image}
                </div>
                <div style={supportStyles.counselorInfo}>
                  <h3 style={supportStyles.counselorName}>{counselor.name}</h3>
                  <p style={supportStyles.counselorSpecialization}>{counselor.specialization}</p>
                  <p style={supportStyles.counselorAvailability}>Available: {counselor.availability}</p>
                </div>
              </div>
              <button 
                style={supportStyles.appointmentButton}
                onClick={() => handleBookAppointment(counselor)}
                className="tap-effect"
              >
                Schedule Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {appointments.filter(app => app.status !== 'cancelled').length > 0 && (
        <section style={supportStyles.appointmentsList}>
          <h2 style={{ marginBottom: '1rem' }}>Your Appointments</h2>
          {appointments
            .filter(app => app.status !== 'cancelled')
            .map(appointment => (
              <div key={appointment.id} style={supportStyles.appointmentItem}>
                <div style={supportStyles.appointmentInfo}>
                  <div style={supportStyles.appointmentTitle}>
                    {getCounselorName(appointment.counselorId)}
                  </div>
                  <div style={supportStyles.appointmentDate}>
                    {formatDate(appointment.date)} at {appointment.time}
                  </div>
                </div>
                <div>
                  <span style={{
                    ...supportStyles.statusBadge,
                    ...(appointment.status === 'scheduled' ? supportStyles.scheduledBadge :
                        appointment.status === 'completed' ? supportStyles.completedBadge :
                        supportStyles.cancelledBadge)
                  }}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  {appointment.status === 'scheduled' && (
                    <button 
                      style={{...supportStyles.cancelButton, marginLeft: '0.5rem', padding: '0.25rem 0.5rem'}}
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="tap-effect"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
        </section>
      )}
      
      <section style={supportStyles.section}>
        <h2 style={{ marginBottom: '1rem' }}>Crisis Support Chat</h2>
        <div style={supportStyles.chatContainer}>
          <div style={supportStyles.chatHeader}>
            <div style={supportStyles.counselorImage}>SJ</div>
            <div>
              <h3 style={{ margin: 0 }}>Dr. Sarah Johnson</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gray-600)' }}>
                Online - Usually responds within 1 hour
              </p>
            </div>
          </div>
          
          <div style={supportStyles.chatMessages}>
            {messages.map(message => (
              <div 
                key={message.id} 
                style={{
                  ...supportStyles.message,
                  ...(message.sender === 'user' ? supportStyles.userMessage : supportStyles.counselorMessage)
                }}
              >
                {message.text}
                <div style={supportStyles.messageTime}>{message.timestamp}</div>
              </div>
            ))}
          </div>
          
          <div style={supportStyles.chatInput}>
            <textarea 
              style={supportStyles.textarea}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={2}
              onKeyPress={handleKeyDown}
            />
            <button 
              style={supportStyles.sendButton}
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </section>
      
      <section style={supportStyles.section}>
        <h2 style={{ marginBottom: '1rem' }}>Wellness Resources</h2>
        <div style={supportStyles.resources}>
          <ul style={supportStyles.resourcesList}>
            <li style={supportStyles.resourceItem}>
              <span style={supportStyles.resourceIcon}>📚</span>
              <a href="#" style={supportStyles.resourceLink}>Student Wellness Center</a>
            </li>
            <li style={supportStyles.resourceItem}>
              <span style={supportStyles.resourceIcon}>🧘‍♀️</span>
              <a href="#" style={supportStyles.resourceLink}>Guided Meditation Resources</a>
            </li>
            <li style={supportStyles.resourceItem}>
              <span style={supportStyles.resourceIcon}>📝</span>
              <a href="#" style={supportStyles.resourceLink}>Stress Management Techniques</a>
            </li>
            <li style={supportStyles.resourceItem}>
              <span style={supportStyles.resourceIcon}>💤</span>
              <a href="#" style={supportStyles.resourceLink}>Sleep Improvement Guide</a>
            </li>
            <li style={supportStyles.resourceItem}>
              <span style={supportStyles.resourceIcon}>🏃‍♂️</span>
              <a href="#" style={supportStyles.resourceLink}>Campus Fitness Programs</a>
            </li>
          </ul>
        </div>
      </section>

      {isBooking && selectedCounselor && (
        <div style={supportStyles.modalOverlay}>
          <div style={supportStyles.modalContent}>
            <div style={supportStyles.modalHeader}>
              <h3 style={supportStyles.modalTitle}>Schedule Appointment with {selectedCounselor.name}</h3>
              <button style={supportStyles.closeButton} onClick={() => setIsBooking(false)}>×</button>
            </div>
            <div style={supportStyles.formGroup}>
              <label style={supportStyles.label}>Select Date</label>
              <input 
                type="date" 
                style={supportStyles.input} 
                value={selectedDate} 
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {selectedDate && (
              <div style={supportStyles.formGroup}>
                <label style={supportStyles.label}>Select Time</label>
                <div style={supportStyles.timeSlotGrid}>
                  {availableTimeSlots.length > 0 ? (
                    availableTimeSlots.map(time => (
                      <div 
                        key={time} 
                        style={{
                          ...supportStyles.timeSlot,
                          ...(selectedTime === time ? supportStyles.selectedTimeSlot : {})
                        }}
                        onClick={() => handleTimeSelect(time)}
                        className="tap-effect"
                      >
                        {time}
                      </div>
                    ))
                  ) : (
                    <p>No available time slots for this date.</p>
                  )}
                </div>
              </div>
            )}
            
            <div style={{ marginTop: '1.5rem' }}>
              <button 
                style={{
                  ...supportStyles.saveButton,
                  opacity: (!selectedDate || !selectedTime) ? 0.5 : 1
                }} 
                onClick={handleSaveAppointment}
                disabled={!selectedDate || !selectedTime}
                className="tap-effect"
              >
                Book Appointment
              </button>
              <button 
                style={supportStyles.cancelButton} 
                onClick={() => setIsBooking(false)}
                className="tap-effect"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support; 