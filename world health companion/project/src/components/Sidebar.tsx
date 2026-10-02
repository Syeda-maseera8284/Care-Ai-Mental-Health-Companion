import React from 'react';
import { MessageSquare, Activity, BookOpen, AlertTriangle, X, BrainCog } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab, closeSidebar }) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    closeSidebar();
  };
  
  return (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">CareAI</h2>
        <button 
          onClick={closeSidebar}
          className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleTabClick('chat')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === 'chat'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare size={20} className="mr-3" />
              <span>Chat</span>
            </button>
          </li>
          
          <li>
            <button
              onClick={() => handleTabClick('mood')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === 'mood'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Activity size={20} className="mr-3" />
              <span>Mood Tracker</span>
            </button>
          </li>
          
          <li>
            <button
              onClick={() => handleTabClick('quiz')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BrainCog size={20} className="mr-3" />
              <span>Mood Quiz</span>
            </button>
          </li>
          
          <li>
            <button
              onClick={() => handleTabClick('wellness')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === 'wellness'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <BookOpen size={20} className="mr-3" />
              <span>Wellness Tools</span>
            </button>
          </li>
          
          <li>
            <button
              onClick={() => handleTabClick('resources')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === 'resources'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <AlertTriangle size={20} className="mr-3" />
              <span>Resources</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p className="mb-1">© 2025 CareAI Companion</p>
          <p>Your data is encrypted and stored locally</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
