// This is a simplified sentiment analysis function
// In a production app, this would connect to a proper NLP service
export const analyzeSentiment = async (text: string): Promise<string> => {
  const text_lower = text.toLowerCase();
  
  // Very basic sentiment analysis
  const positiveWords = ['happy', 'good', 'great', 'excellent', 'better', 'joy', 'grateful', 'thankful', 'excited'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'worse', 'depressed', 'anxious', 'worried', 'stressed', 'angry'];
  const neutralWords = ['okay', 'fine', 'alright', 'neutral', 'normal'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;
  
  positiveWords.forEach(word => {
    if (text_lower.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (text_lower.includes(word)) negativeScore++;
  });
  
  neutralWords.forEach(word => {
    if (text_lower.includes(word)) neutralScore++;
  });
  
  // Check for crisis indicators
  const crisisWords = ['suicide', 'kill myself', 'end my life', 'want to die', 'no reason to live'];
  const hasCrisisIndicator = crisisWords.some(word => text_lower.includes(word));
  
  if (hasCrisisIndicator) return 'crisis';
  if (positiveScore > negativeScore && positiveScore > neutralScore) return 'positive';
  if (negativeScore > positiveScore && negativeScore > neutralScore) return 'negative';
  return 'neutral';
};

// Function to detect stress indicators in text
export const detectStressIndicators = (text: string): string[] => {
  const stressIndicators: string[] = [];
  const stressPatterns = [
    { pattern: /overwhelm(ed|ing)?/i, label: 'feeling overwhelmed' },
    { pattern: /stress(ed|ful)?/i, label: 'stress mentioned' },
    { pattern: /anxious|anxiety/i, label: 'anxiety indicators' },
    { pattern: /can't\s+sleep|insomnia|trouble\s+sleeping/i, label: 'sleep issues' },
    { pattern: /tired|exhausted|fatigue/i, label: 'fatigue mentioned' },
    { pattern: /worry(ing)?|worried/i, label: 'worry indicators' },
    { pattern: /headache|pain/i, label: 'physical symptoms' },
    { pattern: /too\s+much(\s+to\s+do)?/i, label: 'feeling overloaded' }
  ];
  
  stressPatterns.forEach(({ pattern, label }) => {
    if (pattern.test(text)) {
      stressIndicators.push(label);
    }
  });
  
  return stressIndicators;
};

// Generate bot response based on user input and sentiment
export const generateBotResponse = async (userMessage: string, sentiment: string): Promise<string> => {
  const responses = {
    crisis: [
      "I'm very concerned about what you're sharing. Please know that help is available 24/7. Would you like me to provide crisis resources?",
      "I hear your pain. Your life matters. Let's get you connected with professional support right away.",
      "You're not alone in this. There are people who want to help. Can I share some immediate support options with you?"
    ],
    negative: [
      "I hear that you're going through a difficult time. Would you like to tell me more about what's troubling you?",
      "That sounds really challenging. How long have you been feeling this way?",
      "I'm here to listen. What kind of support would be most helpful right now?",
      "It's okay to feel this way. Would you like to explore some coping strategies together?"
    ],
    positive: [
      "I'm glad you're feeling positive! What's contributing to your good mood?",
      "That's wonderful to hear! Would you like to explore ways to maintain this positive energy?",
      "It's great that you're feeling good! How can we build on this momentum?"
    ],
    neutral: [
      "How would you say your overall mood has been lately?",
      "Would you like to explore what's on your mind?",
      "I'm here to listen. Feel free to share whatever you'd like.",
      "What would be most helpful for you to discuss right now?"
    ]
  };

  const responseArray = responses[sentiment as keyof typeof responses] || responses.neutral;
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};