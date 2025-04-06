'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeRoute, setActiveRoute] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showingNotification, setShowingNotification] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Custom cursor refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorActive, setCursorActive] = useState(false);

  // Handle dark mode separately from other effects
  useEffect(() => {
    // Check local storage first for user preference
    const storedDarkMode = localStorage.getItem('darkMode');
    
    if (storedDarkMode) {
      const isDark = storedDarkMode === 'true';
      setIsDarkMode(isDark);
    } else {
      // If no stored preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
    
    setIsInitialized(true);
  }, []);
  
  // Apply dark mode class when state changes and component is initialized
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
    }
  }, [isDarkMode, isInitialized]);

  // Determine active route and handle notifications
  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveRoute(currentPath);

    // Show a notification example after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
      setShowingNotification(true);
      
      // Hide notification after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowingNotification(false);
        setTimeout(() => setShowNotification(false), 500);
      }, 5000);
      
      return () => clearTimeout(hideTimer);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    };
    
    const onMouseDown = () => {
      setCursorActive(true);
    };
    
    const onMouseUp = () => {
      setCursorActive(false);
    };
    
    // Add hover effect for interactive elements
    const addCursorHover = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorActive(true));
        el.addEventListener('mouseleave', () => setCursorActive(false));
      });
    };
    
    // Call once and also set a timeout to handle elements added later
    addCursorHover();
    setTimeout(addCursorHover, 1000);
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', String(newDarkModeState));
  };
  
  const routes = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/challenges', label: 'Challenges', icon: '🎯' },
    { path: '/mood-tracker', label: 'Mood', icon: '😊' },
    { path: '/ai-insights', label: 'AI Insights', icon: '🧠' },
    { path: '/reminders', label: 'Reminders', icon: '🔔' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/support', label: 'Support', icon: '💬' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <html lang="en" className={isDarkMode ? 'dark-mode' : ''}>
      <head>
        <title>MindScope</title>
        <meta name="description" content="Mental wellness companion for students" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="app-container">
          <header className="app-header">
            <div className="header-content">
              <Link href="/" className="app-logo">
                <span className="logo-icon">🧠</span>
                <span className="logo-text">MindScope</span>
              </Link>
              
              <div className="header-actions">
                <button 
                  onClick={toggleDarkMode} 
                  className="theme-toggle tap-effect"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? '🌙' : '☀️'}
                </button>
                
                <button 
                  className="notification-button tap-effect"
                  onClick={() => {
                    setShowNotification(true);
                    setShowingNotification(true);
                    setTimeout(() => {
                      setShowingNotification(false);
                      setTimeout(() => setShowNotification(false), 500);
                    }, 3000);
                  }}
                  aria-label="Show notifications"
                >
                  🔔
                </button>
              </div>
            </div>
          </header>
          
          <main className="app-content">
            {children}
          </main>
          
          <footer className="app-footer">
            <nav className="footer-nav">
              {routes.slice(0, 6).map((route) => (
                <Link 
                  key={route.path}
                  href={route.path}
                  className={`nav-item ${activeRoute === route.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{route.icon}</span>
                  <span className="nav-label">{route.label}</span>
                  {activeRoute === route.path && <div className="active-indicator" />}
                </Link>
              ))}
            </nav>
          </footer>
        </div>
        
        {/* Notification Toast */}
        {showNotification && (
          <div className={`notification-toast ${showingNotification ? 'show' : 'hide'}`}>
            <div className="notification-icon">🎯</div>
            <div className="notification-content">
              <div className="notification-title">New Challenge Available</div>
              <div className="notification-message">Check out the new mindfulness challenge!</div>
            </div>
            <button 
              className="notification-close"
              onClick={() => {
                setShowingNotification(false);
                setTimeout(() => setShowNotification(false), 500);
              }}
            >
              ×
            </button>
          </div>
        )}
        
        {/* Custom cursor */}
        <div 
          ref={cursorRef}
          className={`custom-cursor ${cursorActive ? 'active' : ''}`}
        ></div>
        <div 
          ref={cursorDotRef}
          className="custom-cursor-dot"
        ></div>

        <style jsx>{`
          .app-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            max-width: var(--app-max-width);
            margin: 0 auto;
            position: relative;
          }
          
          .app-header {
            height: var(--app-header-height);
            border-bottom: 1px solid var(--gray-200);
            position: sticky;
            top: 0;
            background-color: var(--background);
            z-index: 10;
            transition: background-color var(--transition-normal);
          }
          
          .header-content {
            height: 100%;
            padding: 0 var(--space-md);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .app-logo {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 1.25rem;
            color: var(--foreground);
            text-decoration: none;
          }
          
          .logo-icon {
            margin-right: 0.5rem;
            font-size: 1.5rem;
          }
          
          .header-actions {
            display: flex;
            gap: 0.75rem;
          }
          
          .theme-toggle, .notification-button {
            background: none;
            border: none;
            font-size: 1.25rem;
            padding: 0.4rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--gray-100);
            transition: all var(--transition-fast);
            cursor: pointer;
          }
          
          .theme-toggle:hover, .notification-button:hover {
            background-color: var(--gray-200);
            transform: translateY(-2px);
            box-shadow: var(--shadow-sm);
          }
          
          .app-content {
            flex: 1;
            overflow-y: auto;
            padding: var(--app-padding);
            padding-bottom: calc(var(--app-footer-height) + var(--app-padding));
          }
          
          .app-footer {
            height: var(--app-footer-height);
            border-top: 1px solid var(--gray-200);
            position: fixed;
            bottom: 0;
            width: 100%;
            max-width: var(--app-max-width);
            background-color: var(--background);
            z-index: 10;
            transition: background-color var(--transition-normal);
          }
          
          .footer-nav {
            height: 100%;
            display: flex;
            justify-content: space-around;
          }
          
          .nav-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: var(--gray-600);
            text-decoration: none;
            position: relative;
            transition: all var(--transition-fast);
            gap: 0.25rem;
          }
          
          .nav-item:hover {
            color: var(--primary);
            transform: translateY(-2px);
          }
          
          .nav-item.active {
            color: var(--primary);
          }
          
          .nav-icon {
            font-size: 1.25rem;
          }
          
          .nav-label {
            font-size: 0.7rem;
            font-weight: 500;
          }
          
          .active-indicator {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 16px;
            height: 2px;
            background-color: var(--primary);
            border-radius: 4px;
          }
          
          .notification-toast {
            position: fixed;
            top: calc(var(--app-header-height) + 1rem);
            right: 1rem;
            max-width: 300px;
            background-color: var(--card-background);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 100;
            border-left: 4px solid var(--primary);
            transform: translateX(calc(100% + 1rem));
            opacity: 0;
            transition: transform 0.5s ease, opacity 0.5s ease;
          }
          
          .notification-toast.show {
            transform: translateX(0);
            opacity: 1;
          }
          
          .notification-toast.hide {
            transform: translateX(calc(100% + 1rem));
            opacity: 0;
          }
          
          .notification-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
          }
          
          .notification-content {
            flex: 1;
          }
          
          .notification-title {
            font-weight: bold;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
          }
          
          .notification-message {
            font-size: 0.85rem;
            color: var(--gray-600);
          }
          
          .notification-close {
            background: none;
            border: none;
            font-size: 1.25rem;
            line-height: 1;
            color: var(--gray-600);
            cursor: pointer;
            padding: 0.2rem;
          }
          
          @media (min-width: 768px) {
            .app-container {
              max-width: 1200px;
              border-left: 1px solid var(--gray-200);
              border-right: 1px solid var(--gray-200);
            }
            
            .nav-item {
              padding: 0.5rem 1rem;
            }
            
            .notification-toast {
              max-width: 350px;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
