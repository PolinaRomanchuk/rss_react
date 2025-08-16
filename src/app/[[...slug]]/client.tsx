'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { IntlProvider } from 'next-intl';

const App = dynamic(() => import('../../App'), {
  ssr: false,
});

const languageMap = {
  en: () => import('../../locales/en.json'),
  ru: () => import('../../locales/ru.json'),
};

export function ClientOnly() {
  const [locale, setLocale] = useState<'en' | 'ru'>('en');

  const [language, setLanguage] = useState<unknown>(null);

  React.useEffect(() => {
    languageMap[locale]().then((mod) => setLanguage(mod.default));
  }, [locale]);

  if (!language) return null;

  return (
    <IntlProvider locale={locale} messages={language}>
      <App locale={locale} setLocale={setLocale} />
    </IntlProvider>
  );
}
