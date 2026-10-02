import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // Default active tab

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">
        {/* Header - Always Visible */}
        <Header 
          toggleSidebar={toggleSidebar} 
          darkMode={false} 
          setDarkMode={() => {}} 
        />

        {/* Main Content - Starts below the header */}
        <main className="flex-1 p-6 pt-20">  
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
