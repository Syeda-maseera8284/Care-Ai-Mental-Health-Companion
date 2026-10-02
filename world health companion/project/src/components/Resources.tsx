import React, { useState } from 'react';
import { ExternalLink, Search, Phone, Users, Book, AlertTriangle } from 'lucide-react';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Sample resources data
  const resources = [
    {
      id: '1',
      name: 'National Suicide Prevention Lifeline',
      description: 'Free and confidential support for people in distress, 24/7.',
      url: 'https://988lifeline.org/',
      phone: '988',
      category: 'crisis',
      isEmergency: true
    },
    {
      id: '2',
      name: 'Crisis Text Line',
      description: 'Text-based crisis intervention service available 24/7.',
      url: 'https://www.crisistextline.org/',
      phone: 'Text HOME to 741741',
      category: 'crisis',
      isEmergency: true
    },
    {
      id: '3',
      name: 'Psychology Today Therapist Finder',
      description: 'Search for therapists, counselors, and treatment centers in your area.',
      url: 'https://www.psychologytoday.com/us/therapists',
      category: 'therapy'
    },
    {
      id: '4',
      name: 'BetterHelp',
      description: 'Online counseling and therapy services with licensed professionals.',
      url: 'https://www.betterhelp.com/',
      category: 'therapy'
    },
    {
      id: '5',
      name: 'Headspace',
      description: 'Meditation and mindfulness app with guided sessions for stress, anxiety, and more.',
      url: 'https://www.headspace.com/',
      category: 'self-help'
    },
    {
      id: '6',
      name: 'Calm',
      description: 'App for meditation, sleep stories, and relaxation techniques.',
      url: 'https://www.calm.com/',
      category: 'self-help'
    },
    {
      id: '7',
      name: 'NAMI (National Alliance on Mental Illness)',
      description: 'Advocacy, education, and support for individuals affected by mental illness.',
      url: 'https://www.nami.org/',
      category: 'community'
    },
    {
      id: '8',
      name: 'Mental Health America',
      description: 'Community-based nonprofit dedicated to addressing the needs of those living with mental illness.',
      url: 'https://www.mhanational.org/',
      category: 'community'
    },
    {
      id: '9',
      name: 'Veterans Crisis Line',
      description: 'Crisis support for Veterans and their loved ones.',
      url: 'https://www.veteranscrisisline.net/',
      phone: '988, then press 1',
      category: 'crisis',
      isEmergency: true
    },
    {
      id: '10',
      name: 'The Trevor Project',
      description: 'Crisis intervention and suicide prevention for LGBTQ+ young people.',
      url: 'https://www.thetrevorproject.org/',
      phone: '1-866-488-7386',
      category: 'crisis',
      isEmergency: true
    }
  ];
  
  // Filter resources based on search query and active category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory ? resource.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crisis':
        return <AlertTriangle size={18} className="mr-2 text-red-500" />;
      case 'therapy':
        return <Phone size={18} className="mr-2 text-blue-500" />;
      case 'self-help':
        return <Book size={18} className="mr-2 text-green-500" />;
      case 'community':
        return <Users size={18} className="mr-2 text-purple-500" />;
      default:
        return null;
    }
  };
  
  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'crisis':
        return 'Crisis Support';
      case 'therapy':
        return 'Therapy Resources';
      case 'self-help':
        return 'Self-Help Tools';
      case 'community':
        return 'Community Support';
      default:
        return category;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <AlertTriangle size={24} className="text-red-500 mr-2" />
          <h2 className="text-xl font-semibold">Emergency Resources</h2>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="font-medium text-red-700 dark:text-red-300 mb-2">
            If you're experiencing a mental health emergency:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-red-700 dark:text-red-300">
            <li>Call 988 for the National Suicide Prevention Lifeline</li>
            <li>Text HOME to 741741 for the Crisis Text Line</li>
            <li>Call 911 or go to your nearest emergency room</li>
          </ul>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300">
          These resources are available 24/7 and provide immediate support for mental health crises.
          Remember, seeking help is a sign of strength, not weakness.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Mental Health Resources</h2>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
            <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm ${
              activeCategory === null 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          
          <button
            onClick={() => setActiveCategory('crisis')}
            className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
              activeCategory === 'crisis' 
                ? 'bg-red-500 text-white' 
                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}
          >
            <AlertTriangle size={14} className="mr-1" />
            Crisis Support
          </button>
          
          <button
            onClick={() => setActiveCategory('therapy')}
            className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
              activeCategory === 'therapy' 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
            }`}
          >
            <Phone size={14} className="mr-1" />
            Therapy
          </button>
          
          <button
            onClick={() => setActiveCategory('self-help')}
            className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
              activeCategory === 'self-help' 
                ? 'bg-green-500 text-white' 
                : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            }`}
          >
            <Book size={14} className="mr-1" />
            Self-Help
          </button>
          
          <button
            onClick={() => setActiveCategory('community')}
            className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
              activeCategory === 'community' 
                ? 'bg-purple-500 text-white' 
                : 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
            }`}
          >
            <Users size={14} className="mr-1" />
            Community
          </button>
        </div>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No resources found matching your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map(resource => (
              <div 
                key={resource.id} 
                className={`border rounded-lg p-4 ${
                  resource.isEmergency 
                    ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center mb-2">
                  {getCategoryIcon(resource.category)}
                  <h3 className="font-semibold">{resource.name}</h3>
                  {resource.isEmergency && (
                    <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      Emergency
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:text-blue-700 text-sm"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Visit Website
                  </a>
                  
                  {resource.phone && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <Phone size={14} className="mr-1" />
                      {resource.phone}
                    </div>
                  )}
                  
                  <div className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {getCategoryLabel(resource.category)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This list is not exhaustive. If you don't find what you need, please consult with a healthcare professional.
          </p>
          <p className="mt-1">
            Remember that your privacy is important. Review each service's privacy policy before sharing personal information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;