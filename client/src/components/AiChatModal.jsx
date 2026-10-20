import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, X, Sparkles, User, RefreshCw, Download, 
  ExternalLink, Mail, Minimize2, Maximize2 
} from 'lucide-react';
import { portfolioData } from '../portfolioData.js';

export default function AiChatModal({ isOpen, onClose, showToast }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I'm **Tejender's AI Assistant**. I can answer questions about his MERN stack skills, full-stack & AI projects, university background, or internship availability. How can I help you today?`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What is Tejender's tech stack?",
    "Tell me about the InstaGenius project",
    "Is Tejender available for internships?",
    "Why hire Tejender?",
    "How can I contact him?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !minimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, minimized]);

  const generateAnswer = (userQuery) => {
    const q = userQuery.toLowerCase();

    // Check specific project questions
    for (const project of portfolioData.projects) {
      if (q.includes(project.title.toLowerCase()) || q.includes(project.id) || (project.tagline && q.includes(project.tagline.toLowerCase()))) {
        return `**${project.title}** (${project.category}):\n${project.description}\n\n**Key Highlights:**\n${project.highlights?.map(h => `• ${h}`).join('\n') || ''}\n\n**Tech Stack:** ${project.tech.join(', ')}`;
      }
    }

    // Check FAQ keywords
    for (const faq of portfolioData.aiFaqs) {
      const match = faq.keywords.some(k => q.includes(k));
      if (match) {
        return faq.answer;
      }
    }

    // Contextual checks
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return `Hi there! Great to connect with you. Ask me anything about Tejender's background, full-stack projects, or work experience!`;
    }

    if (q.includes('why hire') || q.includes('hire') || q.includes('strengths') || q.includes('value')) {
      return `Tejender combines strong **MERN full-stack foundations** with hands-on **Artificial Intelligence & Computer Vision** skills. He demonstrates high execution speed, clean modular architecture, community leadership (HackJKLU v5.0 Coordinator & GDG member), and a deep commitment to performance and UX polish.`;
    }

    if (q.includes('location') || q.includes('where') || q.includes('city') || q.includes('country')) {
      return `Tejender is based in **Jaipur, Rajasthan, India** and is open to on-site, hybrid, or remote roles worldwide.`;
    }

    if (q.includes('gpa') || q.includes('grade') || q.includes('marks') || q.includes('score')) {
      return `Tejender achieved **85.6% distinction** in his Senior Secondary (Class XII CBSE) and is currently in his undergraduate B.Tech program in Computer Science & Artificial Intelligence at JK Lakshmipat University.`;
    }

    return `Thanks for asking! Tejender is a **Full Stack MERN Developer & CS AI Student** specializing in React, Node.js, Express, MongoDB, and Python AI applications. Would you like to check out his [Projects](#projects), [Download CV](/api/resume/pdf), or [Send a Message](#contact)?`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Realistic typing response
    setTimeout(() => {
      const reply = generateAnswer(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: `Conversation refreshed! Feel free to ask anything about Tejender's skills, projects, or background.`,
        timestamp: 'Just now'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className={`ai-chat-container ${minimized ? 'minimized' : ''}`}>
      {/* Header */}
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <div className="ai-bot-avatar-header">
            <Bot size={18} />
          </div>
          <div>
            <div className="ai-header-name">Ask Tejender AI</div>
            <div className="ai-header-status">
              <span className="ai-status-dot"></span> Online & Grounded in Portfolio
            </div>
          </div>
        </div>

        <div className="ai-header-actions">
          <button 
            onClick={resetChat} 
            className="ai-icon-btn" 
            title="Reset conversation"
          >
            <RefreshCw size={14} />
          </button>
          <button 
            onClick={() => setMinimized(!minimized)} 
            className="ai-icon-btn" 
            title={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button 
            onClick={onClose} 
            className="ai-icon-btn" 
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Messages Area */}
          <div className="ai-messages">
            {messages.map((m) => (
              <div key={m.id} className={`ai-message-row ${m.sender}`}>
                {m.sender === 'bot' && (
                  <div className="ai-msg-avatar">
                    <Sparkles size={14} />
                  </div>
                )}
                <div className={`ai-bubble ${m.sender}`}>
                  <div className="ai-bubble-content">
                    {m.text.split('\n').map((line, idx) => (
                      <p key={idx} style={{ marginBottom: line ? '0.4rem' : '0.2rem' }}>
                        {line.startsWith('• ') ? (
                          <span style={{ paddingLeft: '0.5rem', display: 'block' }}>{line}</span>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                  <div className="ai-bubble-time">{m.timestamp}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row bot">
                <div className="ai-msg-avatar">
                  <Sparkles size={14} />
                </div>
                <div className="ai-bubble bot ai-typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="ai-prompts-row">
            {quickPrompts.map((p, idx) => (
              <button 
                key={idx} 
                className="ai-prompt-chip"
                onClick={() => handleSend(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form 
            className="ai-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input 
              type="text"
              placeholder="Ask anything about Tejender..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="ai-input"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="ai-send-btn"
              title="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
