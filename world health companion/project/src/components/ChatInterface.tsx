import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { Message } from '../types';
import { detectStressIndicators } from '../utils/sentimentAnalysis';
import { analyzeMoodFromQuiz } from "../utils/openai"; // ✅ Import only what exists


interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
      
      // Simulate bot typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };
  
  const renderMessageContent = (message: Message) => {
    if (message.sender === 'user') {
      // For user messages, detect stress indicators
      const stressIndicators = detectStressIndicators(message.content);
      
      return (
        <div>
          <p>{message.content}</p>
          {stressIndicators.length > 0 && (
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="italic">Detected: {stressIndicators.join(', ')}</span>
            </div>
          )}
        </div>
      );
    } else {
      // Enhanced formatter for Gemini responses
      const formatContent = (text: string) => {
        // Clean up the text first
        let cleanText = text
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
          .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
          .replace(/#{1,6}\s*/g, '')       // Remove headers
          .trim();

        // Split into sections by double line breaks
        const sections = cleanText.split(/\n\s*\n/).filter(section => section.trim());
        const elements: React.ReactNode[] = [];

        sections.forEach((section, sectionIndex) => {
          const lines = section.split('\n').map(line => line.trim()).filter(line => line);
          
          // Check if this section is a bullet list
          const isBulletList = lines.length > 1 && lines.every(line => 
            /^[*•-]\s+/.test(line) || /^\d+\.\s+/.test(line)
          );

          if (isBulletList) {
            const isNumbered = lines[0].match(/^\d+\./); 
            const ListComponent = isNumbered ? 'ol' : 'ul';
            const listClass = isNumbered ? 'list-decimal' : 'list-disc';
            
            elements.push(
              React.createElement(ListComponent, {
                key: `list-${sectionIndex}`,
                className: `${listClass} pl-5 mb-3 space-y-1`
              }, lines.map((line, lineIndex) => 
                React.createElement('li', {
                  key: lineIndex,
                  className: 'text-sm leading-relaxed'
                }, line.replace(/^[*•-]\s+|^\d+\.\s+/, ''))
              ))
            );
          } else {
            // Regular paragraph
            elements.push(
              <p key={`para-${sectionIndex}`} className="mb-3 text-sm leading-relaxed">
                {section}
              </p>
            );
          }
        });

        return elements.length > 0 ? elements : [
          <p key="fallback" className="text-sm leading-relaxed">{cleanText}</p>
        ];
      };

      return (
        <div className="space-y-2">
          {message.isEmergency && (
            <div className="flex items-center mb-2 text-red-500">
              <AlertTriangle size={16} className="mr-1" />
              <span className="font-bold">Emergency Resources</span>
            </div>
          )}
          <div className="prose prose-sm max-w-none">
            {formatContent(message.content)}
          </div>
          {message.isEmergency && (
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">
              <p className="font-semibold">Emergency Resources:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>National Suicide Prevention Lifeline: 988</li>
                <li>Crisis Text Line: Text HOME to 741741</li>
                <li>Emergency Services: 911</li>
              </ul>
            </div>
          )}
        </div>
      );
    }
  };
  
  // Helper function to safely format timestamp
  const formatTimestamp = (timestamp: Date | string) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Unknown time";
    }
  };
  
  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Serene AI Companion</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          I'm here to listen and support you. While I can provide guidance and resources, 
          I'm not a replacement for professional mental health care.
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pb-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : message.isEmergency 
                    ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800' 
                    : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {renderMessageContent(message)}
              <div className="text-xs mt-1 opacity-70">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Fixed input box at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-2 shadow-md">
        <form onSubmit={handleSubmit} className="flex items-center max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 p-2 bg-transparent focus:outline-none dark:text-white"
          />
          <button 
            type="submit" 
            className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        <p>Your conversations are end-to-end encrypted and stored only on your device.</p>
        <p>This AI companion is not a substitute for professional mental health treatment.</p>
      </div>
    </div>
  );
};

export default ChatInterface;
