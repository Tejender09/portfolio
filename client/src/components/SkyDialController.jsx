import React, { useState } from 'react';
import { Sun, Sunset, Moon, X, Sliders, Sparkles, Cloud } from 'lucide-react';
import CometDial from './CometDial.jsx';

/**
 * SkyDialController: Provides an interactive control panel with <CometDial />
 * to smoothly blend the dynamic cloudy sky between Day (0%), Sunset (50%), and Night (100%).
 */
export default function SkyDialController({
  skyTime,
  setSkyTime,
  isDarkMode,
  isOpen,
  onClose,
  showToast
}) {
  const getSkyPhaseLabel = (val) => {
    if (val < 30) return { label: 'Daylight Sky', icon: Sun, color: '#f59e0b', desc: 'Bright sunbeams & fluffy cumulus clouds' };
    if (val < 70) return { label: 'Sunset & Dusk', icon: Sunset, color: '#f97316', desc: 'Vibrant twilight glow & golden-hour rim lighting' };
    return { label: 'Midnight Sky', icon: Moon, color: '#a855f7', desc: 'Silvery moonlight, twinkling stars & nocturnal clouds' };
  };

  const phase = getSkyPhaseLabel(skyTime);
  const PhaseIcon = phase.icon;

  if (!isOpen) return null;

  return (
    <div className="sky-dial-overlay" onClick={onClose}>
      <div 
        className="sky-dial-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Dynamic Sky & Atmosphere Controller"
      >
        {/* Header */}
        <div className="sky-dial-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="sky-dial-icon-badge" style={{ backgroundColor: `${phase.color}22`, color: phase.color }}>
              <PhaseIcon size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Sky Atmosphere Dial</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                React Bits &lt;CometDial /&gt; Controller
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="btn-icon" 
            style={{ width: '2rem', height: '2rem', padding: 0 }}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Dial Display Stage */}
        <div className="sky-dial-stage">
          <CometDial
            value={skyTime}
            min={0}
            max={100}
            step={1}
            unit="%"
            label="Sky Atmosphere"
            accent="var(--accent)"
            ink="var(--text-primary)"
            size={220}
            sweep={320}
            thickness={6}
            speed={30}
            tapBounce={0.2}
            flickBounce={0.12}
            momentum={1}
            cometReach={180}
            cometWidth={12}
            onChange={(val) => {
              setSkyTime(val);
            }}
            onChangeEnd={(val) => {
              if (showToast) {
                if (val < 30) showToast('Daylight sky atmosphere active');
                else if (val < 70) showToast('Sunset golden-hour sky active');
                else showToast('Midnight starry sky active');
              }
            }}
          />

          <div className="sky-dial-phase-info">
            <span className="sky-dial-phase-pill" style={{ borderColor: `${phase.color}44`, color: phase.color }}>
              <PhaseIcon size={14} />
              <span>{phase.label}</span>
            </span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.4rem', textAlign: 'center' }}>
              {phase.desc}
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="sky-dial-presets">
          <button
            type="button"
            onClick={() => {
              setSkyTime(10);
              if (showToast) showToast('Set to Bright Day (10%)');
            }}
            className={`sky-preset-btn ${skyTime < 30 ? 'active' : ''}`}
          >
            <Sun size={14} style={{ color: '#f59e0b' }} />
            <span>Day</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSkyTime(50);
              if (showToast) showToast('Set to Golden Sunset (50%)');
            }}
            className={`sky-preset-btn ${skyTime >= 30 && skyTime < 70 ? 'active' : ''}`}
          >
            <Sunset size={14} style={{ color: '#f97316' }} />
            <span>Sunset</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSkyTime(90);
              if (showToast) showToast('Set to Starry Night (90%)');
            }}
            className={`sky-preset-btn ${skyTime >= 70 ? 'active' : ''}`}
          >
            <Moon size={14} style={{ color: '#a855f7' }} />
            <span>Night</span>
          </button>
        </div>

        <div className="sky-dial-hint">
          <span>💡 Drag or flick the knob ring to change the time of day, sun/moon trajectory, and cloud lighting.</span>
        </div>
      </div>
    </div>
  );
}
