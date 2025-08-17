'use client';
import type { ReactElement } from 'react';
import './header.css';

import { useTheme } from '../context/ThemeContext';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '../../i18n/navigation';

const Header = (): ReactElement => {
  const { isDark, setIsDark } = useTheme();
  const translate = useTranslations('header');
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === 'ru' ? 'en' : 'ru';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Image
          width={40}
          height={40}
          className="logo"
          src="/pikachu.png"
          alt="logo"
        />
      </div>
      <div className="header_actions">
        <button onClick={toggleLocale}>{locale === 'ru' ? 'en' : 'ру'}</button>
        {isDark ? (
          <Image
            src={'/moon.svg'}
            width={24}
            height={24}
            alt="moon icon"
            className="theme-icon dark"
            onClick={() => setIsDark((previous) => !previous)}
          />
        ) : (
          <Image
            src={'/sun.svg'}
            width={24}
            height={24}
            alt="sun icon"
            className="theme-icon"
            onClick={() => setIsDark((previous) => !previous)}
          />
        )}
        <nav>
          <ul className="header-links-container">
            <Link href="/" className="header-link">
              {translate('home')}
            </Link>
            <Link href="/about" className="header-link">
              {translate('about')}
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
