'use client';

import React from 'react';
import TabBar from "./TabBar";
import AppHeader from "./AppHeader";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <AppHeader />
      <main className="app-content">
        {children}
      </main>
      <TabBar />
    </div>
  );
};

export default ClientLayout; 