import React from 'react';
import Link from 'next/link';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/mood-tracker', label: 'Mood Tracker' },
  { path: '/challenges', label: 'Challenges' },
  { path: '/support', label: 'Support' },
  { path: '/profile', label: 'Profile' }
];

const headerStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'var(--gray-100)',
    borderBottom: '1px solid var(--gray-200)'
  },
  logo: {
    textDecoration: 'none',
    color: 'var(--foreground)',
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  nav: {
    display: 'flex',
    listStyle: 'none',
    gap: '1.5rem',
    margin: 0
  },
  link: {
    textDecoration: 'none',
    color: 'var(--foreground)'
  }
};

const Header: React.FC = () => {
  return (
    <header style={headerStyles.header}>
      <div className="logo">
        <Link href="/" style={headerStyles.logo}>
          Campus Wellness
        </Link>
      </div>
      <nav>
        <ul style={headerStyles.nav}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} style={headerStyles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 