import React, { useState } from 'react';
import { Calendar, Clock, Edit3 } from 'lucide-react';

interface MoodTrackerProps {
  moodData: { date: Date; value: number; note: string }[];
  onMoodLog: (value: number, note: string) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ moodData, onMoodLog }) => {
  const [moodValue, setMoodValue] = useState(3);
  const [moodNote, setMoodNote] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMoodLog(moodValue, moodNote);
    setMoodNote('');
    setShowForm(false);
  };
  
  const getMoodLabel = (value: number): string => {
    const labels = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];
    return labels[value - 1] || 'Unknown';
  };
  
  const getMoodColor = (value: number): string => {
    const colors = [
      'bg-red-500', // Very Low
      'bg-orange-400', // Low
      'bg-yellow-400', // Neutral
      'bg-green-400', // Good
      'bg-green-500', // Excellent
    ];
    return colors[value - 1] || 'bg-gray-400';
  };
  
  const getAverageMood = (): number => {
    if (moodData.length === 0) return 0;
    const sum = moodData.reduce((acc, entry) => acc + entry.value, 0);
    return Math.round((sum / moodData.length) * 10) / 10;
  };
  
  const getMoodTrend = (): string => {
    if (moodData.length < 3) return 'Not enough data';
    
    const recentMoods = [...moodData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 5);
    
    const trend = recentMoods.reduce((acc, entry, index, array) => {
      if (index === 0) return acc;
      return acc + (entry.value - array[index - 1].value);
    }, 0);
    
    if (trend > 1) return 'Improving';
    if (trend < -1) return 'Declining';
    return 'Stable';
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Mood Tracker</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Entries</h3>
            <p className="text-2xl font-bold">{moodData.length}</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-green-700 dark:text-green-300 mb-1">Average Mood</h3>
            <p className="text-2xl font-bold">{getAverageMood()}/5</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-1">Trend</h3>
            <p className="text-2xl font-bold">{getMoodTrend()}</p>
          </div>
        </div>
        
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors"
          >
            <Edit3 size={18} className="mr-2" />
            Log Today's Mood
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-3">How are you feeling today?</h3>
            
            <div className="flex justify-between mb-2">
              <span className="text-xs">Very Low</span>
              <span className="text-xs">Excellent</span>
            </div>
            
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMoodValue(value)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    moodValue === value 
                      ? `${getMoodColor(value)} text-white ring-2 ring-offset-2 ring-blue-500` 
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            
            <p className="text-center mb-4">
              You selected: <span className="font-medium">{getMoodLabel(moodValue)}</span>
            </p>
            
            <div className="mb-4">
              <label htmlFor="moodNote" className="block mb-1 font-medium">
                Add a note (optional)
              </label>
              <textarea
                id="moodNote"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="What's contributing to your mood today?"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Mood History</h2>
        
        {moodData.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No mood entries yet. Start tracking your mood to see your history here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...moodData]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((entry, index) => (
                <div 
                  key={index} 
                  className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${getMoodColor(entry.value)} flex items-center justify-center text-white font-medium`}>
                        {entry.value}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{getMoodLabel(entry.value)}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          <span>
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                          <Clock size={12} className="ml-2 mr-1" />
                          <span>
                            {new Date(entry.date).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {entry.note && (
                    <div className="mt-2 ml-13 pl-13">
                      <p className="text-gray-600 dark:text-gray-300 text-sm ml-13">
                        {entry.note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;