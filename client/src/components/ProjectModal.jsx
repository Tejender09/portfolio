import React from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle, Cpu, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="proj-modal-backdrop" onClick={onClose}>
      <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
        <div className="proj-modal-header">
          <div>
            <div className="badge" style={{ marginBottom: '0.4rem' }}>
              {project.category}
            </div>
            <h2 className="proj-modal-title">{project.title}</h2>
          </div>
          <button onClick={onClose} className="proj-close-btn" title="Close">
            <X size={20} />
          </button>
        </div>

        <div className="proj-modal-body">
          {project.metrics && (
            <div className="proj-metric-box">
              <Sparkles size={16} className="proj-metric-icon" />
              <span>{project.metrics}</span>
            </div>
          )}

          <p className="proj-modal-desc">{project.description}</p>

          {project.architecture && (
            <div className="proj-modal-section">
              <div className="proj-section-title">
                <Cpu size={16} /> Architecture & System Design
              </div>
              <p className="proj-section-text">{project.architecture}</p>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="proj-modal-section">
              <div className="proj-section-title">
                <Layers size={16} /> Key Engineering Highlights
              </div>
              <ul className="proj-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i}>
                    <CheckCircle size={14} className="proj-check-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="proj-modal-section">
            <div className="proj-section-title">
              Technologies & Frameworks
            </div>
            <div className="tech-badges">
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="proj-modal-footer">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <Github size={16} /> View Source Code
          </a>
          <a 
            href={project.live} 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-primary"
            style={{ fontSize: '0.85rem' }}
          >
            <ExternalLink size={16} /> Launch Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
