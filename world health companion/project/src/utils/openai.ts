import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY ?? "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_DURATION = 1000; // 1 second between API calls
let lastApiCall = 0;

const checkRateLimit = (): boolean => {
  const now = Date.now();
  if (now - lastApiCall < RATE_LIMIT_DURATION) {
    return false;
  }
  lastApiCall = now;
  return true;
};

export const generateAIResponse = async (messages: { role: "user" | "assistant"; content: string }[]) => {
  try {
    const cacheKey = JSON.stringify(messages);
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.response;
    }
    if (!checkRateLimit()) {
      return "I need a moment to process. Please try again shortly.";
    }

    // Analyze message complexity to determine response length
    const userMessage = messages[messages.length - 1]?.content || "";
    const isComplexQuery = userMessage.length > 100 || 
      /\b(explain|help|advice|guidance|support|how|what|why|tell me about)\b/i.test(userMessage);
    
    const systemPrompt = `You are CareAI, a compassionate mental health companion.
    
RESPONSE LENGTH RULES:
    ${isComplexQuery ? 
      '- Provide detailed but focused responses (3-5 paragraphs max)\n    - Include helpful examples or steps when appropriate' : 
      '- Keep responses brief and supportive (1-2 short paragraphs)\n    - Be direct and encouraging'}
    
FORMATTING RULES:
    - Use simple bullet points with - instead of *
    - Avoid excessive markdown formatting
    - Write in a warm, conversational tone
    - Focus on practical, actionable advice
    - End with an encouraging question or statement
    
    Remember: You provide emotional support and general wellness tips, but always remind users to seek professional help for serious concerns.`;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "I understand. I'll provide supportive, well-formatted responses that are easy to read and helpful for mental wellness." }] }
      ]
    });
    const result = await chat.sendMessage(userMessage);
    const response = result.response.text();

    responseCache.set(cacheKey, { response, timestamp: Date.now() });
    return response;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm having technical difficulties. Please try again later.";
  }
};
// **🔹 Analyze Mood from Quiz**
export const analyzeMoodFromQuiz = async (answers: Record<string, string>) => {
  try {
    const prompt = `
      Analyze the following quiz answers and provide a detailed assessment of the person's mood and stress levels. 
      Assign numerical scores (1-10) for both mood and stress, where 1 is the best and 10 is the worst. 
      Format the response as JSON with these fields:
      - moodScore (1-10)
      - stressScore (1-10)
      - analysis (brief description)
      - recommendations (list of mental health tips)

      Quiz Answers:
      ${Object.entries(answers).map(([question, answer]) => `${question}: ${answer}`).join("\n")}
    `;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error analyzing mood from quiz:", error);

    // **Fallback: Basic Local Mood Analysis**
    let moodScore = 5;
    let stressScore = 5;
    
    Object.values(answers).forEach(answer => {
      const lowerAnswer = answer.toLowerCase();
      if (lowerAnswer.includes("very positive") || lowerAnswer.includes("excellent")) {
        moodScore -= 1;
      } else if (lowerAnswer.includes("very negative") || lowerAnswer.includes("poor")) {
        moodScore += 1;
      }
      if (lowerAnswer.includes("stress") || lowerAnswer.includes("anxious")) {
        stressScore += 1;
      } else if (lowerAnswer.includes("calm") || lowerAnswer.includes("relaxed")) {
        stressScore -= 1;
      }
    });

    return {
      moodScore: Math.max(1, Math.min(10, moodScore)),
      stressScore: Math.max(1, Math.min(10, stressScore)),
      analysis: "Based on your responses, I've generated a basic assessment. For more accurate insights, please try again later.",
      recommendations: [
        "Practice deep breathing exercises",
        "Maintain a consistent sleep schedule",
        "Engage in light physical activity",
        "Connect with supportive people",
        "Try mindfulness or meditation",
        "Seek professional support if needed"
      ]
    };
  }
};
