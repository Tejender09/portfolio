import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowRight, Sun, Moon, Download, Bot, Mail, 
  ExternalLink, Code2, Sparkles, X, CornerDownLeft, Cloud, Sunset
} from 'lucide-react';
import { portfolioData } from '../portfolioData.js';

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  setIsDarkMode, 
  onOpenSky,
  setSkyTime,
  onOpenAi, 
  onOpenProject,
  showToast 
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Define commands
  const defaultCommands = [
    {
      id: 'ai',
      category: 'Assistant',
      title: 'Ask Tejender AI Assistant',
      description: 'Chat with the AI about skills, projects & availability',
      icon: Bot,
      action: () => {
        onClose();
        onOpenAi();
      }
    },
    {
      id: 'sky-dial',
      category: 'Preferences',
      title: 'Adjust Sky Atmosphere & Weather Dial',
      description: 'Open the React Bits CometDial sky time controller',
      icon: Cloud,
      action: () => {
        onClose();
        onOpenSky?.();
      }
    },
    {
      id: 'sky-day',
      category: 'Preferences',
      title: 'Set Sky to Bright Daylight (10%)',
      description: 'Sunbeams, azure sky and fluffy white clouds',
      icon: Sun,
      action: () => {
        setSkyTime?.(10);
        showToast?.('Sky set to Bright Daylight');
        onClose();
      }
    },
    {
      id: 'sky-sunset',
      category: 'Preferences',
      title: 'Set Sky to Golden Sunset (50%)',
      description: 'Amber twilight glow & golden-hour rim lighting',
      icon: Sunset,
      action: () => {
        setSkyTime?.(50);
        showToast?.('Sky set to Golden Sunset');
        onClose();
      }
    },
    {
      id: 'sky-night',
      category: 'Preferences',
      title: 'Set Sky to Starry Night (90%)',
      description: 'Cosmic deep midnight, silvery moon and twinkling stars',
      icon: Moon,
      action: () => {
        setSkyTime?.(90);
        showToast?.('Sky set to Starry Night');
        onClose();
      }
    },
    {
      id: 'theme',
      category: 'Preferences',
      title: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`,
      description: 'Toggle between dark and light themes',
      icon: isDarkMode ? Sun : Moon,
      action: () => {
        setIsDarkMode(!isDarkMode);
        showToast(`Switched to ${isDarkMode ? 'Light' : 'Dark'} Mode`);
        onClose();
      }
    },
    {
      id: 'copy-email',
      category: 'Actions',
      title: 'Copy Email Address',
      description: portfolioData.email,
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(portfolioData.email);
        showToast('Email address copied to clipboard!');
        onClose();
      }
    },
    {
      id: 'download-pdf',
      category: 'Actions',
      title: 'Download Resume (PDF)',
      description: 'Standard printable format from backend API',
      icon: Download,
      action: () => {
        window.open('/api/resume/pdf', '_blank');
        onClose();
      }
    },
    {
      id: 'download-docx',
      category: 'Actions',
      title: 'Download Resume (DOCX)',
      description: 'Editable Word document version',
      icon: Download,
      action: () => {
        window.open('/api/resume/docx', '_blank');
        onClose();
      }
    },
    // Navigation
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Go to About Me',
      description: 'Bio, academic background, and key stats',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#about';
        onClose();
      }
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Go to Technical Skills',
      description: 'MERN stack, frontend, backend & tools arsenal',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#skills';
        onClose();
      }
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Go to Featured Projects',
      description: 'InstaGenius, Reading Analyzer, and full-stack apps',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'nav-techtext',
      category: 'Navigation',
      title: 'Go to TechText Lab',
      description: 'Interactive React Bits vector wordmark showcase',
      icon: Sparkles,
      action: () => {
        window.location.hash = '#techtext';
        onClose();
      }
    },
    {
      id: 'nav-timeline',
      category: 'Navigation',
      title: 'Go to Timeline',
      description: 'Education at JKLU & Hackathon leadership milestones',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#timeline';
        onClose();
      }
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Go to Contact',
      description: 'Send a direct message or collaboration proposal',
      icon: ArrowRight,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      }
    },
    // Projects direct
    ...portfolioData.projects.map((p) => ({
      id: `proj-${p.id}`,
      category: 'Projects',
      title: p.title,
      description: p.tagline || p.description,
      icon: Sparkles,
      action: () => {
        onClose();
        if (onOpenProject) onOpenProject(p);
      }
    }))
  ];

  const filteredCommands = defaultCommands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div 
        className="cmd-modal" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="cmd-search-header">
          <Search size={18} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search (e.g. projects, ai, cv, theme)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="cmd-close-btn" title="Close (Esc)">
            <kbd className="cmd-kbd">ESC</kbd>
          </button>
        </div>

        <div className="cmd-list">
          {filteredCommands.length === 0 ? (
            <div className="cmd-empty">
              No matching commands or projects found.
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-icon">
                    <Icon size={16} />
                  </div>
                  <div className="cmd-item-text">
                    <div className="cmd-item-title-row">
                      <span className="cmd-item-title">{item.title}</span>
                      <span className="cmd-item-category">{item.category}</span>
                    </div>
                    <span className="cmd-item-desc">{item.description}</span>
                  </div>
                  {isSelected && (
                    <CornerDownLeft size={14} className="cmd-enter-icon" />
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate <kbd className="cmd-kbd">↑</kbd> <kbd className="cmd-kbd">↓</kbd></span>
          <span>Select <kbd className="cmd-kbd">↵</kbd></span>
          <span>Close <kbd className="cmd-kbd">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
