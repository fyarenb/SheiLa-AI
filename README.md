# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
# SheiLa AI

**Research & Opportunity Intelligence**

SheiLa AI is an AI-powered research and opportunity intelligence assistant designed to help users research and understand developments across **AI, AI Search, AEO, GEO, SEO, Search Quality, data annotation, digital marketing, jobs, internships, fellowships, and freelance opportunities**.

SheiLa is built as a research-focused AI agent rather than a general-purpose chatbot. Its goal is to combine web research, source-based evidence, AI analysis, and opportunity intelligence in one interface.

---

## ✨ Core Capabilities

* 🔎 AI-powered research and web search
* 📰 Recent news and current developments
* 🤖 AI and AI Search intelligence
* 📈 AEO, GEO and SEO research
* 🔍 Search Quality research
* 🏷️ Data annotation and AI evaluation topics
* 💼 Jobs, internships, fellowships and freelance opportunities
* 📚 Source-based answers and inline citations
* 🌐 Multilingual responses
* 🧠 Research-oriented analysis
* 📱 Responsive desktop and mobile interface
* ⚡ Search + AI research workflow

---

## 🧠 Research Approach

SheiLa is designed around a source-based research workflow.

A typical request follows this process:

**User Question → Web Research → Source Evaluation → AI Analysis → Structured Answer**

Responses are designed to distinguish between information supported by sources and the model's own analysis.

Research responses generally include:

* **Key Findings**
* **Analysis**
* **Bottom Line**
* A single **Next Step** question

SheiLa is designed to avoid inventing facts, deadlines, URLs, or citations.

---

## 🔌 AI & Search Architecture

SheiLa uses multiple AI model providers together with a web search layer.

### Google Gemini

Gemini is used as one of the primary AI model providers for generating and analyzing research responses.

### Groq

Groq is integrated into the AI model strategy as an additional model provider and fallback path.

This provides another route for generating responses when the primary model path is unavailable or encounters an error.

### Tavily

SheiLa uses the Tavily Search API for web research.

The search layer supports both general research and recent/news-oriented searches. Search results are passed to the AI layer for analysis rather than simply being displayed as raw search results.

---

## 🔑 API Keys & Environment Variables

SheiLa uses environment variables to securely configure its external API credentials.

The application can use:

```env
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

`GROQ_API_KEY` is the environment variable used for the Groq API authentication. Groq recommends storing API keys in environment variables rather than hardcoding them in application source code.

API keys should **never be committed to GitHub or exposed in client-side/browser code**. They should remain on the server side or inside the deployment platform's protected environment-variable configuration.

---

## 🏗️ Technology Stack

* **React**
* **TypeScript**
* **Vite**
* **Google Gemini API**
* **Groq API**
* **Tavily Search API**
* **React Markdown**
* **Vercel**

---

## 🔐 API Architecture

The main server-side chat API is located at:

```text
api/chat.ts
```

The server-side API handles communication between the frontend, web search service, and AI model providers.

The application uses environment variables for its API credentials:

```env
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Keeping these credentials server-side prevents API keys from being exposed in the browser.

### OpenAPI

The project currently does **not** include a separate OpenAPI specification file such as:

```text
openapi.json
openapi.yaml
```

---

# 🎨 Interface & Design

SheiLa was designed as a dedicated research interface rather than a generic chat application.

The visual identity includes:

* SheiLa wordmark and logo
* **Research & Opportunity Intelligence** tagline
* Main headline:
  **“Research smarter. Find what matters.”**
* Research-focused welcome screen
* Chat/research interface
* Source citation markers
* Source cards
* Next Step interaction
* Responsive layout
* Custom typography, spacing and visual hierarchy

The design uses a blue and pink visual identity with supporting accent colors.

Key visual colors include:

```text
#315b91
#6fa0d6
#ffc9d7
#ef7fa4
#ed76a0
```

---

## 🖥️ Desktop Design

The desktop interface was refined for:

* Logo and branding placement
* Welcome section positioning
* Headline and introductory text spacing
* Search/chat area alignment
* Source card presentation
* Disclaimer positioning
* Footer spacing
* Consistent margins and typography
* Overall visual hierarchy

The layout was repeatedly adjusted to achieve the intended spacing and positioning across the main desktop viewport.

---

## 📱 Mobile & Responsive Design

The interface was specifically optimized for mobile devices as well as desktop screens.

Responsive work included:

* Mobile-specific spacing
* Responsive typography
* Flexible content widths
* Preventing horizontal overflow
* Handling narrow widths such as **360px and 390px**
* Adjusting the branding and brand text
* Preventing long text from breaking the layout
* Responsive welcome-section positioning
* Mobile disclaimer positioning
* Maintaining usability on smaller screens

The responsive layout was tested in browser mobile views and on a physical mobile device.

---

## 💬 Response Interface

SheiLa's frontend uses **React Markdown** to render AI-generated research responses.

The interface processes responses to provide:

* Structured headings
* Inline source references
* Favicon-style source markers
* Source cards
* Clean research formatting
* A dedicated Next Step interaction

The frontend also processes source references so that citations appear naturally within the response.

---

## 🔗 Sources & Citations

SheiLa emphasizes source transparency.

Relevant claims can be associated with markers such as:

```text
[Source 1]
[Source 2]
```

The frontend converts these references into compact citation elements and corresponding source cards.

The application is designed so that citations are based on the actual research results rather than being generated as unsupported references.

---

## ⚡ Performance & Reliability

Performance improvements have focused on reducing response latency without reducing research quality.

The project uses:

* Server-side API processing
* Tavily search optimization
* Search request timeouts
* AI model fallback handling
* Multiple AI model providers
* Vercel serverless deployment

The fallback architecture allows SheiLa to attempt another available AI route when a primary model is unavailable.

---

## 🚀 Deployment

SheiLa AI is deployed using **Vercel**.

The project follows a Git-based development and deployment workflow.

The production application uses server-side API routes and protected environment variables for external services.

---

## 📁 Project Structure

The main application is organized around the frontend and server-side API:

```text
SheiLa/
└── app/
    ├── api/
    │   └── chat.ts
    ├── src/
    │   ├── App.tsx
    │   └── App.css
    ├── package.json
    └── ...
```

The structure may evolve as development continues.

---

## 🛠️ Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Before running the application, configure the required environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

---

## 🎯 Project Goal

SheiLa AI brings together:

**Search → Evidence → Analysis → Opportunity**

The project is designed to help users move beyond simply receiving an AI-generated answer.

SheiLa aims to help users:

1. Find relevant information.
2. Understand what happened.
3. Evaluate why it matters.
4. Identify opportunities and implications.
5. Continue research from relevant sources.

---

## 📌 Project Status

SheiLa AI is an actively developed project.

The AI model strategy, search workflow, research architecture, interface, responsive design, and performance architecture continue to evolve through development and testing.

---

## 👩‍💻 Author

**Fatma Yaren Birben**

Research & Opportunity Intelligence
AI Search • AEO • GEO • SEO • Search Quality

---

*SheiLa prioritizes relevance, recency, source-based evidence, clear analysis, and practical research value.*

