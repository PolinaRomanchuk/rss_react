import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Main from './components/main/Main.tsx';
import './global.css';

const root = document.getElementById('root');
if (!root) throw new Error('No root');

createRoot(root).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
