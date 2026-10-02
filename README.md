# 🧠 CareAI — Mental Health Companion

CareAI is a private, AI-powered mental wellness companion that offers empathetic conversations, mood tracking, guided relaxation exercises, and instant access to crisis resources — all in a calm, judgment-free space.

> **Note:** CareAI is a supportive companion, **not** a substitute for professional care. It cannot diagnose conditions or provide medical advice. If you are in crisis, please use the [emergency resources](#-crisis-resources) below.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

### 💬 AI Chat Companion
- Compassionate, context-aware conversations powered by **Google Gemini**
- Responses adapt in length and tone to what you share
- Built-in response caching and rate limiting for smooth, efficient chats

### 😊 Mood Tracker
- Log how you're feeling each day, with optional notes
- See your total entries, average mood, and trend at a glance
- Review your full mood history over time

### 🧩 Mood Assessment Quiz
- A short interactive quiz about your recent well-being
- AI analyzes your answers and returns mood & stress scores with personalized recommendations
- Falls back to a local analysis if the AI service is unavailable

### 🌿 Wellness Tools
Guided, step-by-step exercises you can follow in the app:
- **4-7-8 Breathing** — calm your nervous system with paced breathing
- **Body Scan Meditation** — release tension from head to toe
- **5-4-3-2-1 Grounding** — anchor yourself in the present moment
- **Progressive Muscle Relaxation** — ease physical stress

### 🆘 Resources
- Emergency crisis hotlines displayed prominently
- Curated mental health organizations and reading material
- Red-highlighted emergency messaging when it matters most

### 🔍 Smart Sentiment Analysis
- Lightweight, on-device keyword analysis detects sentiment and stress indicators (anxiety, sleep issues, feeling overwhelmed, and more)
- Crisis-related language is flagged so help is never more than one tap away

### 🎨 Thoughtful UX
- **Dark mode** toggle (remembered between visits)
- Fully **responsive** — sidebar navigation on desktop, bottom tab bar on mobile
- All chat history, mood data, and preferences saved **locally in your browser**

---

## 🆘 Crisis Resources

| Resource | Contact |
|----------|---------|
| 988 Suicide & Crisis Lifeline (US) | Call or text **988** |
| Crisis Text Line | Text **HOME** to **741741** |
| Emergency Services | **911** |
| SAMHSA National Helpline | **1-800-662-4357** |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or later
- A free **Google Gemini API key** — get one at [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Syeda-maseera8284/Care-Ai-Mental-Health-Companion.git
cd Care-Ai-Mental-Health-Companion

# 2. Enter the app directory
cd "world health companion/project"

# 3. Install dependencies
npm install

# 4. Add your Gemini API key
cp .env.example .env
#    then open .env and paste your key:
#    VITE_GEMINI_API_KEY=your_key_here

# 5. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Other Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

> ⚠️ **Never commit your `.env` file** — it's already listed in `.gitignore`.

---

## 📁 Project Structure

```
world health companion/project/
├── src/
│   ├── components/
│   │   ├── ChatInterface.tsx    # Main AI conversation UI
│   │   ├── MoodTracker.tsx      # Daily mood logging & history
│   │   ├── MoodQuiz.tsx         # Interactive mood assessment
│   │   ├── WellnessTools.tsx    # Guided breathing & relaxation exercises
│   │   ├── Resources.tsx        # Crisis lines & mental health links
│   │   ├── Sidebar.tsx          # Desktop navigation
│   │   ├── Header.tsx           # Top bar with theme toggle
│   │   └── Layout.tsx           # Page shell
│   ├── utils/
│   │   ├── openai.ts            # Gemini AI integration (chat + quiz analysis)
│   │   └── sentimentAnalysis.ts # Sentiment, stress & crisis detection
│   ├── App.tsx                  # App state, tabs & persistence
│   ├── types.ts                 # Shared TypeScript types
│   └── main.tsx                 # Entry point
├── .env.example                 # Template for environment variables
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| AI | Google Gemini API (`gemini-2.0-flash`) |
| Storage | Browser localStorage (no server, no cloud) |

---

## 🔒 Privacy

- 💾 All data (chats, mood entries, preferences) stays **on your device** — there is no backend and no account system
- 🚫 Nothing is shared with third parties beyond the AI provider needed to generate chat responses
- 🗑️ Clearing your browser data wipes everything instantly

---

## 🗺️ Roadmap

- [ ] Voice-to-text input
- [ ] Multi-language support
- [ ] Journaling with mood history insights
- [ ] Wearable integration for biometric trends
- [ ] Guided meditation audio
- [ ] Therapist connection portal

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**Making mental health support accessible, immediate, and stigma-free.** 💙

</div>
