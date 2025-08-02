import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Main from './components/main/Main.tsx';
import './global.css';
import ErrorBoundary from './components/error/ErrorBoundary.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorPage from './components/error-page/ErrorPage.tsx';
import About from './components/about/About.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { ThemeProvider } from './components/context/ThemeContext.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('No root');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
