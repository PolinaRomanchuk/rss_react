import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Main from './components/main/Main.tsx';
import './global.css';
import ErrorBoundary from './components/error/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorPage from './components/error-page/ErrorPage.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('No root');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
