import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import Providers from '../../Providers';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`/messages/${locale}.json`)).default;

  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
