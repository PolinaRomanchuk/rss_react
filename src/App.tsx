import { StrictMode } from 'react';
import Main from './components/main/Main';
import './global.css';
import ErrorBoundary from './components/error/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorPage from './components/error-page/ErrorPage';
import About from './components/about/About';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './components/context/ThemeContext';
import Header from './components/header/Header';

type AppProps = {
  locale: 'en' | 'ru';
  setLocale: (locale: 'en' | 'ru') => void;
};

export default function App({ locale, setLocale }: AppProps) {
  return (
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <Header locale={locale} setLocale={setLocale} />
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
}
