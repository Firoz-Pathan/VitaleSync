import React from 'react';
import Link from 'next/link';

const footerStyles = {
  footer: {
    marginTop: 'auto',
    padding: '1.5rem 2rem',
    backgroundColor: 'var(--gray-100)',
    borderTop: '1px solid var(--gray-200)',
    textAlign: 'center' as const
  },
  text: {
    margin: 0,
    color: 'var(--gray-600)'
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    margin: '1rem 0'
  },
  link: {
    color: 'var(--gray-600)',
    textDecoration: 'none'
  }
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.links}>
        <Link href="/about" style={footerStyles.link}>About</Link>
        <Link href="/privacy" style={footerStyles.link}>Privacy Policy</Link>
        <Link href="/terms" style={footerStyles.link}>Terms of Use</Link>
        <Link href="/contact" style={footerStyles.link}>Contact Us</Link>
      </div>
      <p style={footerStyles.text}>
        &copy; {currentYear} Smart Campus Wellness Monitor. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer; 