import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlayerProvider, usePlayer } from './PlayerProvider';
import { Section } from './ui/Section';
import { Launcher } from './ui/Launcher';
import { Dock } from './ui/Dock';
import { Immersive } from './ui/Immersive';
import { Toast } from './ui/Toast';
import './styles/codersGoTo.css';

const FloatingPlayerLayers: React.FC = () => {
  const { errorToast, dismissToast } = usePlayer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <>
      <Launcher />
      <Dock />
      <Immersive />
      <Toast message={errorToast} onDismiss={dismissToast} />
    </>,
    document.body
  );
};

export const CodersGoTo: React.FC = () => {
  return (
    <PlayerProvider>
      <Section />
      <FloatingPlayerLayers />
    </PlayerProvider>
  );
};

export default CodersGoTo;

