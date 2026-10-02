import React, { useState } from 'react';
import { Clock, Play, Pause, RefreshCw } from 'lucide-react';

const WellnessTools: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  
  // Sample exercises data
  const exercises = [
    {
      id: 'breathing',
      title: '4-7-8 Breathing',
      description: 'A breathing technique that promotes relaxation by inhaling for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds.',
      duration: 180,
      category: 'breathing',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'meditation',
      title: 'Body Scan Meditation',
      description: 'A mindfulness practice where you focus attention on different parts of your body, noticing sensations without judgment.',
      duration: 300,
      category: 'meditation',
      imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'mindfulness',
      title: '5-4-3-2-1 Grounding',
      description: 'A technique to manage anxiety by identifying 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
      duration: 240,
      category: 'mindfulness',
      imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'physical',
      title: 'Progressive Muscle Relaxation',
      description: 'A practice of tensing and then releasing different muscle groups to reduce physical tension and promote relaxation.',
      duration: 360,
      category: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];
  
  // Start exercise timer
  const startExercise = (id: string) => {
    const exercise = exercises.find(ex => ex.id === id);
    if (!exercise) return;
    
    setActiveExercise(id);
    setTimerSeconds(exercise.duration);
    setTimerRunning(true);
    
    // For breathing exercise, start with inhale phase
    if (id === 'breathing') {
      setBreathingPhase('inhale');
    }
  };
  
  // Toggle timer pause/resume
  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };
  
  // Reset exercise
  const resetExercise = () => {
    const exercise = exercises.find(ex => ex.id === activeExercise);
    if (!exercise) return;
    
    setTimerSeconds(exercise.duration);
    setTimerRunning(false);
    
    if (activeExercise === 'breathing') {
      setBreathingPhase('inhale');
    }
  };
  
  // Close active exercise
  const closeExercise = () => {
    setActiveExercise(null);
    setTimerRunning(false);
  };
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Render breathing exercise content
  const renderBreathingExercise = () => {
    let instruction = '';
    let animationClass = '';
    
    switch (breathingPhase) {
      case 'inhale':
        instruction = 'Inhale through your nose for 4 seconds';
        animationClass = 'animate-expand';
        break;
      case 'hold':
        instruction = 'Hold your breath for 7 seconds';
        animationClass = 'animate-pulse-slow';
        break;
      case 'exhale':
        instruction = 'Exhale through your mouth for 8 seconds';
        animationClass = 'animate-contract';
        break;
    }
    
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className={`w-32 h-32 rounded-full bg-blue-400 dark:bg-blue-500 mx-auto ${animationClass}`}></div>
        </div>
        <h3 className="text-xl font-medium mb-2">{instruction}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Focus on your breathing and follow the circle's rhythm
        </p>
      </div>
    );
  };
  
  // Render meditation exercise content
  const renderMeditationExercise = () => {
    return (
      <div className="text-center">
        <h3 className="text-xl font-medium mb-4">Body Scan Meditation</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Find a comfortable position. Close your eyes and bring awareness to your body.
          Slowly scan from your toes to the top of your head, noticing sensations without judgment.
        </p>
        <div className="space-y-4 text-left">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Start with your feet</p>
            <p className="text-sm">Notice any sensations in your toes, soles, and ankles.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Move to your legs</p>
            <p className="text-sm">Bring awareness to your calves, knees, and thighs.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Focus on your torso</p>
            <p className="text-sm">Notice sensations in your abdomen, chest, and back.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Attend to your arms and hands</p>
            <p className="text-sm">Feel any sensations in your fingers, hands, and arms.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Complete with your head</p>
            <p className="text-sm">Notice sensations in your neck, face, and scalp.</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render mindfulness exercise content
  const renderMindfulnessExercise = () => {
    return (
      <div className="text-center">
        <h3 className="text-xl font-medium mb-4">5-4-3-2-1 Grounding Technique</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          This technique helps anchor you to the present moment by engaging your senses.
        </p>
        <div className="space-y-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <p className="font-medium">5 Things You Can See</p>
            <p className="text-sm">Look around and identify five objects in your environment.</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-medium">4 Things You Can Touch</p>
            <p className="text-sm">Notice the texture of four things you can physically feel.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">3 Things You Can Hear</p>
            <p className="text-sm">Listen for three distinct sounds in your environment.</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-medium">2 Things You Can Smell</p>
            <p className="text-sm">Identify two scents around you (or recall favorite scents).</p>
          </div>
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="font-medium">1 Thing You Can Taste</p>
            <p className="text-sm">Notice one flavor you can taste right now (or recall a favorite taste).</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render physical exercise content
  const renderPhysicalExercise = () => {
    return (
      <div className="text-center">
        <h3 className="text-xl font-medium mb-4">Progressive Muscle Relaxation</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tense each muscle group for 5-7 seconds, then release and relax for 10-20 seconds.
          Notice the difference between tension and relaxation.
        </p>
        <div className="space-y-4 text-left">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Feet and Legs</p>
            <p className="text-sm">Curl your toes tightly, then relax. Next, tense your calves and thighs.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Abdomen and Chest</p>
            <p className="text-sm">Tighten your stomach muscles, then relax. Next, tense your chest.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Arms and Hands</p>
            <p className="text-sm">Make fists and tense your arms, then release and relax.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Shoulders and Neck</p>
            <p className="text-sm">Raise your shoulders toward your ears, then relax them down.</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium">Face</p>
            <p className="text-sm">Scrunch your facial muscles, then relax. Clench your jaw, then release.</p>
          </div>
        </div>
      </div>
    );
  };
  
  // Render active exercise content based on ID
  const renderExerciseContent = () => {
    switch (activeExercise) {
      case 'breathing':
        return renderBreathingExercise();
      case 'meditation':
        return renderMeditationExercise();
      case 'mindfulness':
        return renderMindfulnessExercise();
      case 'physical':
        return renderPhysicalExercise();
      default:
        return null;
    }
  };
  
  // React effect for timer countdown
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
        
        // For breathing exercise, update phases
        if (activeExercise === 'breathing') {
          const totalCycle = 4 + 7 + 8; // 4-7-8 breathing
          const currentSecond = timerSeconds % totalCycle;
          
          if (currentSecond === totalCycle) {
            setBreathingPhase('inhale');
          } else if (currentSecond === totalCycle - 4) {
            setBreathingPhase('hold');
          } else if (currentSecond === totalCycle - 4 - 7) {
            setBreathingPhase('exhale');
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds, activeExercise]);
  
  return (
    <div className="max-w-3xl mx-auto">
      {activeExercise ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {exercises.find(ex => ex.id === activeExercise)?.title}
            </h2>
            <button 
              onClick={closeExercise}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Close
            </button>
          </div>
          
          {renderExerciseContent()}
          
          <div className="mt-8 flex flex-col items-center">
            <div className="text-4xl font-bold mb-4">
              {formatTime(timerSeconds)}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={toggleTimer}
                className={`p-3 rounded-full ${
                  timerRunning 
                    ? 'bg-yellow-500 hover:bg-yellow-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {timerRunning ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button
                onClick={resetExercise}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <RefreshCw size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Wellness Tools</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore these evidence-based exercises to help manage stress, anxiety, and improve your overall mental wellbeing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-700 dark:text-blue-300">Breathing Exercises</h3>
                <p className="text-sm mt-1">Calm your nervous system through controlled breathing techniques</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-purple-700 dark:text-purple-300">Meditation</h3>
                <p className="text-sm mt-1">Practice mindfulness to reduce stress and increase awareness</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-green-700 dark:text-green-300">Grounding Techniques</h3>
                <p className="text-sm mt-1">Connect to the present moment to reduce anxiety and overwhelm</p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-amber-700 dark:text-amber-300">Physical Relaxation</h3>
                <p className="text-sm mt-1">Release physical tension to promote mental relaxation</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Available Exercises</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercises.map(exercise => (
                <div 
                  key={exercise.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={exercise.imageUrl} 
                      alt={exercise.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {exercise.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock size={16} className="mr-1" />
                        <span>{formatTime(exercise.duration)}</span>
                      </div>
                      
                      <button
                        onClick={() => startExercise(exercise.id)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WellnessTools;