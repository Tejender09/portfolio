import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <CheckCircle2 size={16} className="toast-icon" />
      <span className="toast-message">{message}</span>
    </div>
  );
}
