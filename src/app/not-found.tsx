import type { ReactElement } from 'react';
import '../components/error-page/error-page.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ErrorPage = (): ReactElement => {
  const t = useTranslations('error-page');
  return (
    <div className="error-page">
      <div className="error-page_error-text-container">
        <p>4</p>
        <div className="error-page_image-container">
          <Image width={200} height={200} src="/pokeball.png" alt="0" />
        </div>
        <p>4</p>
      </div>
      <p className="error-page_title">{t('title')}</p>
      <p className="error-page_subtitle">{t('message')}</p>
      <div className="error-page_link-container">
        <Link href="/" className="error-page_link">
          {t('button')}
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
