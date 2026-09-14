# SheiLa AI

## Research & Opportunity Intelligence Agent

SheiLa AI is a professional research and opportunity intelligence agent designed to monitor, evaluate, and prioritize current information across AI, AI Search, AEO, GEO, SEO, search quality evaluation, data annotation, technology, digital marketing, e-commerce, and copywriting.

It finds recent and relevant research, news, community discussions, tools, industry developments, and professional opportunities, then evaluates their relevance, credibility, recency, and practical value.

SheiLa is designed as a research and discovery agent rather than a generic personal assistant.

It was initially built for personal and professional use to reduce the need to manually check multiple websites for research, industry developments, career opportunities, freelance work, internships, fellowships, and related professional opportunities.

---

## What SheiLa Does

SheiLa can:

* Research current industry developments.
* Find recent AI, SEO, AEO, GEO, and search-related information.
* Analyze community discussions and professional conversations.
* Discover relevant tools and platforms.
* Find jobs, internships, freelance opportunities, fellowships, and relevant professional development opportunities.
* Evaluate opportunities for relevance and professional fit.
* Prioritize information based on relevance, recency, credibility, practical value, and professional importance.
* Present findings as a structured research brief with citations.

The system is intended for users who need to continuously monitor fast-changing AI, search, digital marketing, technology, and professional opportunity landscapes.

---

## Example Queries

```text
What are the latest AI search developments in 2026?
```

```text
Find currently open jobs and internships related to AI, SEO, digital marketing, data annotation, or search quality evaluation.
```

```text
Provide a daily research brief containing multiple articles, discussions, industry updates, tools, and professional opportunities.
```

---

## Research Scope

SheiLa focuses on four major research categories:

### Research & Industry Developments

Industry news, research developments, technology changes, search developments, AI developments, SEO/AEO/GEO developments, and other professionally relevant updates.

### Community Discussions

Relevant conversations and discussions from public online communities and discussion platforms.

### Tools & Platforms

New tools, platform updates, professional software, AI tools, search tools, and other products relevant to the user's professional interests.

### Professional Opportunities

The opportunity search can cover:

* Full-time jobs
* Internships
* Freelance opportunities
* Fellowships
* Relevant training
* Professional development opportunities

For opportunities, SheiLa attempts to identify:

* Organization
* Role or program
* Opportunity type
* Location or remote status
* Deadline
* Eligibility
* Professional fit
* Application source
* Priority

---

## Source Quality & Prioritization

SheiLa prioritizes information according to:

* Relevance to the user's professional interests and expertise
* Recency
* Source credibility
* Factual support
* Opportunity or claim validity
* Practical value
* Safety

The system must not fabricate:

* Sources
* Statistics
* Jobs
* Internships
* Fellowships
* Deadlines
* URLs
* Organizations
* Company information
* Other unsupported facts

SheiLa distinguishes between verified information, interpretation, and uncertainty.

Primary and authoritative sources are preferred over aggregators, low-quality websites, forums, and potentially misleading content.

Sources are deduplicated by publisher where possible.

Citations use a consistent bracketed format and are linked to the corresponding verified source.

---

## Output Structure

Research responses are structured into clear sections.

### Research & Industry Updates

Each item may include:

* Topic
* What happened
* Why it matters
* Source
* Publication date
* Relevance
* Priority

### Discussions

Each discussion may include:

* Platform
* Topic
* Key insight
* Engagement, where available
* Source
* Why it matters
* Priority

### Tools & Platforms

Each tool or platform entry may include:

* Tool/platform
* Update
* Use case
* Professional relevance
* Source
* Priority

### Opportunities

Each opportunity may include:

* Organization
* Position/program
* Type
* Location/remote status
* Deadline
* Eligibility
* Professional fit
* Application source
* Priority

### Priority Levels

Opportunities and information may be classified as:

* High
* Medium
* Low

Priority is based on factors such as relevance, recency, credibility, practical value, and professional fit.

---

## Response Format

The research-oriented response structure is designed around:

```text
Executive Summary
        ↓
Key Findings
        ↓
Analysis
        ↓
Bottom Line
        ↓
Next Step
```

The system is designed to provide:

* Source-supported findings
* Clear separation between evidence and analysis
* Relevant citations
* Three key findings when substantial research is required
* A practical bottom line
* One clear next-step question

The underlying research and content-quality rules are intentionally preserved rather than being relaxed simply to make responses faster.

---

## Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   SheiLa React UI   │
                    │   Vite + React + TS  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     /api/chat       │
                    │ Vercel Serverless    │
                    │     Function         │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
       ┌──────────────────┐       ┌──────────────────┐
       │    Tavily API    │       │   Gemini / Groq  │
       │   Web Research   │       │   AI Analysis    │
       └────────┬─────────┘       └────────┬─────────┘
                │                          │
                └────────────┬─────────────┘
                             ▼
                  ┌─────────────────────┐
                  │ Structured Research │
                  │ + Citations         │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    SheiLa UI        │
                  │ Source Cards / Chat │
                  └─────────────────────┘
```

### Request Flow

```text
User
  ↓
SheiLa React UI
  ↓
/api/chat
  ↓
Tavily web research
  ↓
Gemini / Groq analysis
  ↓
Structured response + citations
  ↓
SheiLa UI
  ↓
Vercel
```

---

## Technology Stack

### Frontend

* Vite
* React
* TypeScript
* ReactMarkdown
* Responsive desktop and mobile interface
* Chat interface
* Source cards
* Opportunities view

### Backend

The backend is implemented as a single Vercel serverless function:

```text
api/chat.ts
```

It orchestrates the research, search, model, citation, and response-generation pipeline.

### Web Search

SheiLa uses the Tavily API for web research.

The implementation uses advanced search and retrieves up to five relevant sources per query.

### AI Models

The primary model integration uses Google Gemini through:

```text
@google/genai
```

A Groq integration provides an automatic fallback when Gemini returns an error such as a rate-limit or server-side failure.

### Hosting

The application is deployed on Vercel.

Vercel project:

```text
sheila-ai
```

Live application:

```text
https://sheila-ai-one.vercel.app
```

---

## Environment Variables

The application requires the following environment variables:

```env
GEMINI_API_KEY=...
TAVILY_API_KEY=...
GROQ_API_KEY=...
```

These keys are required for the AI and web-research pipeline.

---

## Setup

### Requirements

A current Node.js installation is required.

The application is built with Vite, React, and TypeScript.

### Clone the Repository

```bash
git clone https://github.com/fyarenb/SheiLa-AI.git
cd SheiLa-AI
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_key
TAVILY_API_KEY=your_tavily_key
GROQ_API_KEY=your_groq_key
```

### Run Locally

```bash
npm run dev
```

The Vite development server will provide a local URL for the application.

---

## Deployment

The project is deployed through Vercel.

For a new deployment, the required environment variables must be added under:

```text
Vercel
→ Project Settings
→ Environment Variables
```

The same variables used locally are required:

```text
GEMINI_API_KEY
TAVILY_API_KEY
GROQ_API_KEY
```

The connected Git branch can trigger a production deployment when changes are pushed.

Production URL:

```text
https://sheila-ai-one.vercel.app
```

---

## Key Design Decisions

### 1. Dual-Model Fallback

Gemini is used as the primary model while Groq can act as a fallback when Gemini encounters an error such as a rate limit or server failure.

This improves resilience.

The trade-off is that response style can vary slightly depending on which model processes a request.

### 2. Speed vs. Quality

The research pipeline includes timeout and retry behavior for web research and model requests.

However, the underlying research and content-quality rules were deliberately not weakened simply to improve response speed.

Accuracy, source quality, and factual reliability remain more important than raw response speed.

### 3. Structured Research Output

Instead of returning an unstructured chatbot answer, SheiLa organizes research into:

```text
Executive Summary
Key Findings
Analysis
Bottom Line
Next Step
```

This makes research easier to scan and more useful for professional decision-making.

### 4. Citation Presentation

The model returns source references using:

```text
[Source N]
```

The frontend converts these references into visual favicon-based source markers and source cards connected to the verified URLs.

---

## Safety & Guardrails

SheiLa is designed with explicit safety and reliability rules.

The system must not:

* Fabricate sources
* Fabricate statistics
* Fabricate jobs or internships
* Fabricate fellowships
* Fabricate deadlines
* Fabricate URLs
* Fabricate company or organization information
* Treat an unverified opportunity as confirmed
* Hide uncertainty
* Use suspicious or misleading sources when better sources are available

The system prefers primary and authoritative sources whenever possible.

SheiLa also avoids automatically:

* Applying for jobs
* Contacting recruiters
* Publishing social media posts
* Interacting with external platforms
* Making professional decisions on behalf of the user

External or irreversible actions require explicit confirmation.

The agent also avoids destructive file or document changes without confirmation.

Private Gmail, Drive, or other personal information should not be accessed unnecessarily.

---

# V2 Evaluation

The second evaluation round included five test cases.

## Eval 1 — AI/SEO Industry Research

**PASSED**

The first test identified two presentation issues:

* Citation formatting initially displayed `[Source N]` tags without sufficient visual separation.
* Multiple sources from the same publisher or publisher subdomains could appear repeatedly.

These issues were corrected by:

* Converting `[Source N]` references into visual favicon source cards in the frontend.
* Removing duplicate sources from the same publisher before display.

The test was then passed.

---

## Eval 2 — Reddit and Community Research

**PASSED**

The system successfully handled community-oriented research and presented the resulting information through the research pipeline.

---

## Eval 3 — Career Opportunity Search

**PASSED**

The live evaluation demonstrated real opportunity results including examples such as:

* AlixPartners internship opportunities
* Upwork freelance data-annotation jobs
* Indeed aggregated AI internship listings

The results included source links and explanations of professional relevance and fit.

---

## Eval 4 — Fellowship Search

**PASSED**

The system successfully handled fellowship-oriented opportunity research.

---

## Eval 5 — Quality and Prioritization

**PASSED**

The multi-category research brief was re-tested after the citation and duplicate-source fixes.

The previously observed duplicate-source issue was resolved and the final test passed.

---

## Overall Evaluation Result

```text
5 / 5 tests passed
```

---

## Documented V2 Findings

During evaluation, several areas were identified and improved.

### Unverified Link

An unverified link was encountered during evaluation.

The URL/link hallucination guardrail was adjusted so that links must be verified in real time and the system should self-correct when verification fails.

### Safety Evaluation

The system was tested with destructive-command scenarios.

SheiLa blocked non-executable or destructive actions and instead provided static code snippets where appropriate.

### Citation Formatting

Citation formatting inconsistencies were identified during early evaluation.

The frontend was updated so source references are converted into visual source markers and cards.

### Source Deduplication

Duplicate sources from the same publisher were identified and removed before the final evaluation round.

---

# Limitations

SheiLa's first version focuses primarily on:

* Research discovery
* Research evaluation
* Information prioritization
* Opportunity monitoring

It does not automatically:

* Apply for jobs
* Contact recruiters
* Publish social media content
* Interact directly with Reddit
* Interact directly with Quora
* Interact directly with LinkedIn
* Make professional decisions for the user

Some platform-specific access also depends on technical accessibility.

When direct access to platforms such as Reddit, Quora, or LinkedIn is unavailable, public web search may be used instead.

Some opportunity information may remain unconfirmed, particularly:

* Deadlines
* Eligibility requirements
* Application details

Some source URLs may also be inaccessible when a website blocks bots, uses bot verification, or otherwise prevents full-content verification.

Finally, response style may vary slightly depending on whether Gemini or Groq handles a request.

---

# AI Transparency

SheiLa was built with AI assistance.

Claude was used to help with:

* System-prompt design
* Defining SheiLa as a Research & Opportunity Intelligence Agent rather than a general chatbot
* Designing the structured response format
* Designing citation formatting and source-deduplication rules
* Documentation support

The implementation and integration work included:

* Vite frontend
* React interface
* TypeScript
* `/api/chat` backend
* Tavily web-search integration
* Gemini integration
* Groq fallback integration
* Vercel deployment

The developer wired the application together and performed the live V2 evaluation tests against the deployed application.

The citation-formatting and source-deduplication fixes were also verified on the live application.

Human review remains important, particularly for professional opportunities and information that cannot be independently verified.

---

# Demo

A live end-to-end demonstration video is available here:

[Watch the SheiLa AI Demo](https://onedrive.live.com/?qt=allmyphotos&photosData=%2Fshare%2F00B4C7A2A10687D3%21s7ea619ce2e804508a534694e0b9a5a1d%3Fithint%3Dvideo%26e%3DPlGWVn%26migratedtospo%3Dtrue&cid=00B4C7A2A10687D3&id=00B4C7A2A10687D3%21s7ea619ce2e804508a534694e0b9a5a1d&redeem=aHR0cHM6Ly8xZHJ2Lm1zL3YvYy8wMGI0YzdhMmExMDY4N2QzL0lRRE9HYVotZ0M0SVJhVTBhVTRMbWxvZEFiNXFqUk95bW5aY2ZjSlRfcUFZYjhVP2U9UGxHV1Zu&v=photos)

The demo shows the application running end-to-end and demonstrates both the system's research workflow and one of its practical limitations.

---

# Project Status

SheiLa AI is a working deployed research and opportunity intelligence application.

Current production deployment:

```text
https://sheila-ai-one.vercel.app
```

GitHub repository:

```text
https://github.com/fyarenb/SheiLa-AI
```

Vercel project:

```text
sheila-ai
```

The current implementation includes:

* AI-powered research
* Web search
* Opportunity discovery
* Source prioritization
* Source citations
* Source deduplication
* Gemini primary model
* Groq fallback
* Responsive interface
* Vercel deployment
* V2 evaluation with 5/5 tests passed

SheiLa is designed to continue evolving as a research and opportunity intelligence system while maintaining factual accuracy, source verification, transparency, and user control.

