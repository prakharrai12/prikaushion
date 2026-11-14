import React from 'react';
import { PlayerProvider, usePlayer } from './PlayerProvider';
import { Section } from './ui/Section';
import { Launcher } from './ui/Launcher';
import { Dock } from './ui/Dock';
import { Immersive } from './ui/Immersive';
import { Toast } from './ui/Toast';
import './styles/codersGoTo.css';

const FloatingPlayerLayers: React.FC = () => {
  const { errorToast, dismissToast } = usePlayer();

  return (
    <>
      <Launcher />
      <Dock />
      <Immersive />
      <Toast message={errorToast} onDismiss={dismissToast} />
    </>
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

