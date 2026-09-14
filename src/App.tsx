import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

function SheilaWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`sheila-wordmark ${className}`}>
      Shei<span className="light-blue">L</span>a
    </span>
  )
}

function ResearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 2.5h9l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"
        fill="#6fa0d6"
      />
      <path
        d="M14 2.5V7h5M8.5 11h7M8.5 14.5h7M8.5 18h4"
        fill="none"
        stroke="#315b91"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OpportunityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        fill="#ffc9d7"
      />
      <path
        d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"
        fill="none"
        stroke="#ed76a0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12h18"
        fill="none"
        stroke="#ed76a0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 12v2h4v-2"
        fill="none"
        stroke="#ed76a0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.7 5.3a5 5 0 0 0-6.2 6.2L3.2 16.8a2.1 2.1 0 1 0 3 3l5.3-5.3a5 5 0 0 0 6.2-6.2l-3.1 3.1-3-3 3.1-3.1Z"
        fill="#6fa0d6"
      />
      <circle
        cx="5.2"
        cy="18.3"
        r="0.8"
        fill="#315b91"
      />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 11 18-8-8 18-2.8-7.2L3 11Z" />
      <path d="M10.2 13.8 21 3" />
    </svg>
  )
}

function LoadingPaw() {
  return (
    <div className="loading-paw" aria-label="SheiLa is researching">
      <div className="paw-toes">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="paw-pad" />
    </div>
  )
}

type ChatMessage = {
  role: 'user' | 'sheila'
  content: string
  streaming?: boolean
isNextStepResponse?: boolean
}

type SourceItem = {
  number: number
  title: string
  url: string
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function getFavicon(url: string, size = 64) {
  const hostname = getHostname(url)
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`
}

function renderSheilaContent(
  content: string,
  onNextStep: (
  question: string,
  isNextStepResponse?: boolean,
) => void,
  isNextStepResponse = false,
) {
    const isTurkish = /[çğıöşüÇĞİÖŞÜ]/.test(content)
    const cleanContent = content
    .replace(/\[image\]/gi, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\n{3,}/g, '\n\n')


  const sourceSectionMatch = cleanContent.match(
    /\n### Sources\s*\n\n([\s\S]*)$/,
  )

  const answer = sourceSectionMatch
    ? cleanContent.slice(0, sourceSectionMatch.index)
    : cleanContent
  const answerWithoutStandaloneSources = answer.replace(
  /\[\s*\*{0,2}\s*\d+\.\s*\*{0,2}\s*\]\(\s*https?:\/\/[^)]+\)/gi,
  '',
 )
  const sources: SourceItem[] = []

  if (sourceSectionMatch) {
    const sourceLines = sourceSectionMatch[1]
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    for (const line of sourceLines) {
      const match = line.match(
        /^(\d+)\.\s+\[([^\]]+)\]\((https?:\/\/.*)\)$/,
      )

      if (match) {
        sources.push({
          number: Number(match[1]),
          title: match[2],
          url: match[3],
        })
      }
    }
  }

  const normalizedAnswer = answerWithoutStandaloneSources
    .replace(/^\s*\*+\s*\.\s*(#{1,3})\s*/gm, '$1 ')
    .replace(/^\s*\*+\s*(#{1,3})\s*/gm, '$1 ')

  const citationAnswer = normalizedAnswer.replace(
  /(?:\[(?:Source\s*)?(\d+(?:\s*(?:,|&)\s*(?:Source\s*)?\d+)*)\]|【(?:Source\s*)?(\d+(?:\s*(?:,|&)\s*(?:Source\s*)?\d+)*)】)/gi,
  (_, squareGroup, cornerGroup) => {
    const citationGroup = squareGroup ?? cornerGroup ?? ''
    const numbers = citationGroup.match(/\d+/g) ?? []

    return numbers
      .map((number: string) => {
        const source =
          sources.find(
            (item) => Number(item.number) === Number(number),
          ) ??
          sources[Number(number) - 1]

        if (!source) {
          return ''
        }

        return `[${number}](${source.url})`
      })
      .filter(Boolean)
      .join(' ')
  },
)
  
    const punctuationFixedAnswer = citationAnswer
  
  const nextStepMatch = punctuationFixedAnswer.match(
  /(?:^|\n)\s*(?:\*{0,2}\s*)?(?:#{1,3}\s*)?Next Step\s*(?:→|:)?\s*\n?([\s\S]*?)(?=\n\s*(?:#{1,3}\s+|\*{0,2}\s*Next Step\b)|\s*$)/i,
)

  const nextStepQuestion = nextStepMatch
  ? nextStepMatch[1]
      .replace(/\*\*/g, '')
      .replace(/^Next Step\s*[→:]\s*/i, '')
      .replace(/^[^\wÇĞİÖŞÜçğıöşü]+/u, '')
      .replace(/\s+/g, ' ')
      .trim()
  : ''

    const answerWithoutNextStep = nextStepMatch
    ? punctuationFixedAnswer.replace(nextStepMatch[0], '').trim()
    : punctuationFixedAnswer
   const nextStepFixedAnswer = isNextStepResponse
  ? answerWithoutNextStep.replace(
      /([.!?])(\s*)((?:\[\d+\]\(https?:\/\/[^)]+\)\s*)+)/g,
      '$3$1$2',
    )
  : answerWithoutNextStep
  
  return (
    <>
      <div className="sheila-answer-text">
        <ReactMarkdown
  components={{
    img: () => null,

    p: ({ children }) => (
      <p style={{ margin: 0 }}>{children}</p>
    ),

    li: ({ children }) => (
      <li style={{ marginTop: 0 }}>{children}</li>
    ),
    
    a: ({ href, children }) => {
  const text = Array.isArray(children)
    ? children
        .map((child) => String(child))
        .join('')
        .trim()
    : String(children ?? '').trim()

  const citationNumber = text.replace(/\.$/, '').trim()

 const isCitation =
  !!href &&
  /^\d+$/.test(citationNumber)

  if (isCitation) {
    return (
      <a
        href={href}
        className="source-citation"
        target="_blank"
        rel="noreferrer"
        aria-label={`Source ${text}`}
      >
        <img
          src={getFavicon(href, 32)}
          alt=""
          className="citation-favicon"
          loading="lazy"
        />
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
},   
        
              
            
  }}
>
  {nextStepFixedAnswer}
</ReactMarkdown>

       
   
      </div>

    {nextStepQuestion && (
  <div className="next-step-section">
    <button
      type="button"
      className="next-step-link"
      onClick={() => onNextStep(nextStepQuestion, true)}
    >
            <span className="next-step-label">
        {isTurkish ? 'Sonraki Adım' : 'Next Step'}
      </span>
      <span className="next-step-arrow">→</span>
      <span className="next-step-question">
        {nextStepQuestion}
      </span>
    </button>
  </div>
)}
      {sources.length > 0 && (
        <div className="sources-section">
        <div className="sources-title">
          {isTurkish ? 'Kaynaklar' : 'Sources'}
        </div>

          <div className="sources-list">
            {sources.map((source) => {
              const hostname = getHostname(source.url)

              return (
                <a
                  className="source-card"
                  key={source.number}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="source-number">
                    {source.number}
                  </span>

                  <span className="source-favicon-wrap">
                    <img
                      className="source-favicon"
                      src={getFavicon(source.url)}
                      alt=""
                      loading="lazy"
                    />
                  </span>

                  <span className="source-card-content">
                    <span className="source-card-title">
                      {source.title}
                    </span>

                    <span className="source-card-domain">
                      {hostname}
                    </span>
                  </span>

                  <span
                    className="source-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  const [message, setMessage] = useState('')
  const [chatStarted, setChatStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isNextStepResponse, setIsNextStepResponse] = useState(false)
  const submitResearchQuestion = (
  question: string,
  isNextStepResponse = false,
) => {
  setMessage(question)
  setIsNextStepResponse(isNextStepResponse)

  window.setTimeout(() => {
    const form = document.querySelector(
      'form.chat-box',
    ) as HTMLFormElement | null

    form?.requestSubmit()
  }, 0)
}

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage || loading) return
    const currentIsNextStepResponse = isNextStepResponse
    setIsNextStepResponse(false)

    setChatStarted(true)
    setMessages((current) => [
      ...current,
      { role: 'user', content: trimmedMessage },
    ])
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Something went wrong.')
      }

      if (!res.body) {
        throw new Error('Streaming response is not available.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      setMessages((current) => [
        ...current,
        {
          role: 'sheila',
          content: '',
          streaming: true,
         isNextStepResponse: currentIsNextStepResponse,

        },
      ])

      let streamedText = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        streamedText += decoder.decode(value, {
          stream: true,
        })

        setMessages((current) => {
          const updated = [...current]
          const lastIndex = updated.length - 1

          if (
            lastIndex >= 0 &&
            updated[lastIndex].role === 'sheila'
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: streamedText,
              streaming: true,
            }
          }

          return updated
        })
      }

      streamedText += decoder.decode()

      setMessages((current) => {
        const updated = [...current]
        const lastIndex = updated.length - 1

        if (
          lastIndex >= 0 &&
          updated[lastIndex].role === 'sheila'
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: streamedText,
            streaming: false,
          }
        }

        return updated
      })
    } catch (error) {
      console.error(error)

      setMessages((current) => [
        ...current,
        {
          role: 'sheila',
          content:
            'Sorry, SheiLa could not complete the research request.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (chatStarted) {
    return (
      <main className="sheila-app chat-page">
        <aside className="chat-sidebar">
          <a
            href="/"
            className="chat-sidebar-brand"
            aria-label="SheiLa AI home"
          >
            <img
              src="/SheiLa-Logo.png"
              alt="SheiLa AI"
              className="brand-logo"
            />

            <div className="brand-name">
              <SheilaWordmark />
              <span className="ai-label">AI</span>
            </div>

            <div className="brand-subtitle">
              Research &amp; Opportunity Intelligence
            </div>
          </a>

          <div className="chat-sidebar-actions">
            <button
              type="button"
              onClick={() =>
                submitResearchQuestion('Find the latest AI news')
              }
            >
              <span className="action-icon blue">
                <ResearchIcon />
              </span>

              <span className="action-copy">
                <strong>Research &amp; Updates</strong>
                <span>Find recent industry developments</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                submitResearchQuestion(
  'Find currently open jobs, internships, freelance opportunities, and fellowships related to AI, AI Search, AEO, GEO, SEO, search quality evaluation, data annotation, digital marketing, technology, and copywriting. Prioritize opportunities that are currently accepting applications. For each opportunity, provide the organization, exact position or program, opportunity type, location or remote status, deadline if available, eligibility, current status, why it is relevant, and the verified application source.'
)
              }
            >
              <span className="action-icon pink">
                <OpportunityIcon />
              </span>

              <span className="action-copy">
                <strong>Opportunities</strong>
                <span>
         Find jobs, internships &amp; fellowships
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                submitResearchQuestion('Find useful AI tools')
              }
            >
              <span className="action-icon blue">
                <ToolsIcon />
              </span>

              <span className="action-copy">
                <strong>Tools &amp; Platforms</strong>
                <span>Discover useful professional tools</span>
              </span>
            </button>
          </div>
        </aside>

        <section className="chat-main">
          <header className="chat-main-header">
            <div className="chat-main-title">
              <SheilaWordmark />
              <span className="ai-label">AI</span>
            </div>

            <div className="status">
              <span className="status-dot" />
              <span>
                {loading ? 'Researching' : 'Ready'}
              </span>
            </div>
          </header>

          <section className="chat-conversation">
            {messages.map((item, index) => (
              <div
                className={`chat-message ${item.role}`}
                key={`${item.role}-${index}`}
              >
                <span className="chat-role">
                  {item.role === 'user' ? (
                    'You'
                  ) : (
                    <SheilaWordmark />
                  )}
                </span>

                <div className="chat-message-content">
                  {item.role === 'sheila'
                    ? renderSheilaContent(
                    item.content,
                    submitResearchQuestion,
                    item.isNextStepResponse,
                     )
                    : item.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message sheila">
                <span className="chat-role">
                  <SheilaWordmark />
                </span>

                <div className="chat-message-content loading-content">
                  <LoadingPaw />
                  <span className="loading-text">
                  {messages.some(
                   (m) =>
                 /[çğıöşüÇĞİÖŞÜ]/.test(m.content) ||
                 /\b(bir|ve|için|nedir|nasıl|mı|mi|mu|mü|bu|şu|ile|merhaba|selam|napıyosun|napıyon|ne|neler|kim|nerede|ara|bul)\b/i.test(
                          m.content,
                        ),
                    )
                      ? 'araştırılıyor...'
                      : 'researching...'}
                  </span> 
                 
                </div>
              </div>
            )}
          </section>

          <form
            className="chat-box chat-box-bottom"
            onSubmit={handleSubmit}
          >
            <span className="chat-sparkle">
              <SparkleIcon />
            </span>

            <input
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Ask SheiLa to research something..."
              aria-label="Ask SheiLa"
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={loading}
            >
              <SendIcon />
            </button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="sheila-app">
      <header className="topbar">
        <div className="brand">
          <img
            src="/SheiLa-Logo.png"
            alt="SheiLa AI"
            className="brand-logo"
          />

          <div className="brand-copy">
            <div className="brand-name">
              <SheilaWordmark />
              <span className="ai-label">AI</span>
            </div>

            <div className="brand-subtitle">
              Research &amp; Opportunity Intelligence
            </div>
          </div>
        </div>

        <div className="status">
          <span className="status-dot" />
          <span>Ready</span>
        </div>
      </header>

      <section className="welcome">
        <p className="eyebrow">
          Hello, I’m <SheilaWordmark />
        </p>

        <h1>
          Research smarter.
          <br />
          Find what <span>matters.</span>
        </h1>

        <p className="intro">
          I monitor research, industry developments, tools,
          discussions, and professional opportunities across AI,
          AEO, GEO, SEO, technology, digital marketing,
          e-commerce, and related fields.
        </p>
      </section>

      <form className="chat-box" onSubmit={handleSubmit}>
        <span className="chat-sparkle">
          <SparkleIcon />
        </span>

        <input
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Ask SheiLa to research something..."
          aria-label="Ask SheiLa"
        />

        <button
          type="submit"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>

      <section
        className="quick-actions"
        aria-label="SheiLa capabilities"
      >
        <button
          type="button"
          onClick={() =>
            submitResearchQuestion('Find the latest AI news')
          }
        >
          <span className="action-icon blue">
            <ResearchIcon />
          </span>

          <span className="action-copy">
            <strong>Research &amp; Updates</strong>
            <span>Find recent industry developments</span>
          </span>

          <span className="action-arrow">→</span>
        </button>

        <button
          type="button"
          onClick={() =>
            submitResearchQuestion(
  'Find currently open jobs, internships, freelance opportunities, and fellowships related to AI, AI Search, AEO, GEO, SEO, search quality evaluation, data annotation, digital marketing, technology, and copywriting. Prioritize opportunities that are currently accepting applications. For each opportunity, provide the organization, exact position or program, opportunity type, location or remote status, deadline if available, eligibility, current status, why it is relevant, and the verified application source.'
)
          }
        >
          <span className="action-icon pink">
            <OpportunityIcon />
          </span>

          <span className="action-copy">
            <strong>Opportunities</strong>
            <span>
              Find jobs, internships &amp; fellowships
            </span>
          </span>

          <span className="action-arrow">→</span>
        </button>

        <button
          type="button"
          onClick={() =>
            submitResearchQuestion('Find useful AI tools')
          }
        >
          <span className="action-icon blue">
            <ToolsIcon />
          </span>

          <span className="action-copy">
            <strong>Tools &amp; Platforms</strong>
            <span>Discover useful professional tools</span>
          </span>

          <span className="action-arrow">→</span>
        </button>
      </section>

      <p className="disclaimer">
        <strong>
          <SheilaWordmark />
        </strong>{' '}
        prioritizes relevance, recency, source credibility,
        factual support, practical value, and safety.{' '}
        <span>♥</span>
      </p>
    </main>
  )
}

export default App
