'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AppHeader: React.FC = () => {
  const pathname = usePathname();
  
  // Determine title based on current path
  const getTitle = () => {
    switch(pathname) {
      case '/':
        return 'Campus Wellness';
      case '/dashboard':
        return 'Dashboard';
      case '/mood-tracker':
        return 'Mood Tracker';
      case '/challenges':
        return 'Challenges';
      case '/support':
        return 'Support';
      case '/profile':
        return 'Profile';
      default:
        return 'Campus Wellness';
    }
  };

  // Show back button on all pages except home and dashboard
  const showBackButton = pathname !== '/' && pathname !== '/dashboard';
  
  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        {showBackButton ? (
          <Link href="/dashboard" style={{ marginRight: '10px', fontSize: '1.2rem' }}>
            ←
          </Link>
        ) : (
          <div style={{ width: '20px' }} />
        )}
        
        <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, flex: 1, textAlign: 'center' }}>
          {getTitle()}
        </h1>
        
        <Link href="/profile" style={{ fontSize: '1.2rem' }}>
          👤
        </Link>
      </div>
    </header>
  );
};

export default AppHeader; 