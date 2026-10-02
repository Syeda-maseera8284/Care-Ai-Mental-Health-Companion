import React, { useState, useEffect } from 'react';
import { MessageSquare, Moon, Sun, Activity, BookOpen, AlertTriangle, Menu, BrainCog } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import WellnessTools from './components/WellnessTools';
import Resources from './components/Resources';
import MoodQuiz from './components/MoodQuiz';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Message } from './types';
import { generateAIResponse } from './utils/openai';
import Layout from "./components/Layout";

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm CareAI, your mental wellness companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      sentiment: 'neutral'
    }
  ]);
  const [moodData, setMoodData] = useState<{date: Date, value: number, note: string}[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    const savedMoodData = localStorage.getItem('moodData');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((message: any) => ({
        ...message,
        timestamp: new Date(message.timestamp)
      }));
      setMessages(parsedMessages);
    }
    
    if (savedMoodData) {
      const parsedMoodData = JSON.parse(savedMoodData).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
      setMoodData(parsedMoodData);
    }
    
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('moodData', JSON.stringify(moodData));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [messages, moodData, darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      sentiment: 'neutral'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const aiResponse = await generateAIResponse([
        ...messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        { role: 'user' as const, content }
      ]);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse || "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        sentiment: 'neutral'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        sentiment: 'neutral'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleMoodLog = (value: number, note: string) => {
    setMoodData(prev => [...prev, { date: new Date(), value, note }]);
  };

  return (
    <Layout>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={sidebarOpen} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            closeSidebar={() => setSidebarOpen(false)} 
          />
          
          <main className="flex-1 overflow-hidden flex flex-col">
            <div className="h-full overflow-auto ">
              {activeTab === 'chat' && (
                <ChatInterface 
                  messages={messages} 
                  onSendMessage={handleSendMessage} 
                />
              )}
              
              {activeTab === 'mood' && (
                <MoodTracker 
                  moodData={moodData} 
                  onMoodLog={handleMoodLog} 
                />
              )}
              
              {activeTab === 'quiz' && (
                <MoodQuiz />
              )}
              
              {activeTab === 'wellness' && (
                <WellnessTools />
              )}
              
              {activeTab === 'resources' && (
                <Resources />
              )}
            </div>
          </main>
        </div>
        
        <nav className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 fixed bottom-0 w-full">
          <div className="flex justify-around">
            <button 
              onClick={() => setActiveTab('chat')} 
              className={`p-4 flex flex-col items-center ${activeTab === 'chat' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1">Chat</span>
            </button>
            <button 
              onClick={() => setActiveTab('mood')} 
              className={`p-4 flex flex-col items-center ${activeTab === 'mood' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <Activity size={20} />
              <span className="text-xs mt-1">Mood</span>
            </button>
            <button 
              onClick={() => setActiveTab('quiz')} 
              className={`p-4 flex flex-col items-center ${activeTab === 'quiz' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <BrainCog size={20} />
              <span className="text-xs mt-1">Quiz</span>
            </button>
            <button 
              onClick={() => setActiveTab('wellness')} 
              className={`p-4 flex flex-col items-center ${activeTab === 'wellness' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <BookOpen size={20} />
              <span className="text-xs mt-1">Wellness</span>
            </button>
            <button 
              onClick={() => setActiveTab('resources')} 
              className={`p-4 flex flex-col items-center ${activeTab === 'resources' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <AlertTriangle size={20} />
              <span className="text-xs mt-1">Resources</span>
            </button>
          </div>
        </nav>
      </div>
    </Layout>
  );
}

export default App;
