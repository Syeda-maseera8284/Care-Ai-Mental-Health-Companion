import React, { useState } from 'react';
import { analyzeMoodFromQuiz } from '../utils/openai';
import { Activity, Brain, Heart, AlertTriangle } from 'lucide-react';

interface QuizResult {
  moodScore: number;
  stressScore: number;
  analysis: string;
  recommendations: string[];
}

const MoodQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions = [
    {
      question: "How would you describe your overall mood today?",
      options: ["Very positive", "Somewhat positive", "Neutral", "Somewhat negative", "Very negative"]
    },
    {
      question: "How well did you sleep last night?",
      options: ["Very well", "Fairly well", "Average", "Not very well", "Poorly"]
    },
    {
      question: "How would you rate your current stress level?",
      options: ["No stress", "Mild stress", "Moderate stress", "High stress", "Severe stress"]
    },
    {
      question: "How easy is it for you to concentrate today?",
      options: ["Very easy", "Somewhat easy", "Neutral", "Somewhat difficult", "Very difficult"]
    },
    {
      question: "How would you describe your energy level?",
      options: ["Very energetic", "Somewhat energetic", "Normal", "Somewhat tired", "Very tired"]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].question]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setIsAnalyzing(true);
    const analysis = await analyzeMoodFromQuiz(answers);
    setResults(analysis);
    setShowResults(true);
    setIsAnalyzing(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'text-green-500';
    if (score <= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (showResults && results) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Mood Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Heart className="mr-2" />
              <h3 className="font-medium">Mood Score</h3>
            </div>
            <p className={`text-3xl font-bold ${getScoreColor(results.moodScore)}`}>
              {results.moodScore}/10
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Brain className="mr-2" />
              <h3 className="font-medium">Stress Score</h3>
            </div>
            <p className={`text-3xl font-bold ${getScoreColor(results.stressScore)}`}>
              {results.stressScore}/10
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300">{results.analysis}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={resetQuiz}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {isAnalyzing ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Analyzing your responses...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Mood Assessment Quiz</h2>
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg mb-4">{questions[currentQuestion].question}</h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodQuiz;