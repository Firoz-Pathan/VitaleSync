'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Home', icon: '📊' },
  { path: '/mood-tracker', label: 'Mood', icon: '😊' },
  { path: '/challenges', label: 'Challenges', icon: '🏆' },
  { path: '/support', label: 'Support', icon: '💬' },
];

const TabBar: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <nav className="app-footer">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className={`app-nav-item tap-effect ${isActive ? 'active' : ''}`}
          >
            <span className="app-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default TabBar; 