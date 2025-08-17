'use client';
import { ReactNode } from 'react';
import './global.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './components/context/ThemeContext';
import { NextIntlClientProvider } from 'next-intl';

type AppProps = {
  locale: 'en' | 'ru';
  messages: Record<string, string>;
  children?: ReactNode;
};

export default function Providers({ locale, messages, children }: AppProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
