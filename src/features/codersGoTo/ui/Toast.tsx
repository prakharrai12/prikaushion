import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onDismiss,
  duration = 3500,
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onDismiss, duration]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-6 z-[97] px-4 py-2.5 rounded-pill bg-[#161417] border border-[rgba(244,239,228,0.2)] text-[#F4EFE4] font-mono text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2.5 animate-[fadeIn_0.3s_ease-out]"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#E01B24] animate-pulse" />
      <span>{message}</span>
    </div>
  );
};

