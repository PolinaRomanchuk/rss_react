import type { ReactElement } from 'react';
import '../../../components/about/about.css';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Header from '../../../components/header/Header';

const About = (): ReactElement => {
  const translate = useTranslations();

  return (
    <>
      <Header />
      <div className="about">
        <div className="about_photo-name-container">
          <Image src="/polina.jpg" alt="photo" width={50} height={50} />
          <p>{translate('about.author')}</p>
        </div>
        <div className="about_cours-info">
          {translate('about.message')}{' '}
          <a
            target="_blank"
            href="https://rs.school/courses/reactjs"
            rel="noreferrer"
            className="about_rss-link"
          >
            {translate('about.link')}
          </a>
          <div className="about_contacts">
            <span>{translate('about.contact')}:</span>
            <ul>
              <li>
                <a
                  href="mailto:polina.romanchuk99@mail.ru"
                  rel="noreferrer"
                  aria-label="mail"
                >
                  mail
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PolinaRomanchuk"
                  rel="noreferrer"
                  target="_blank"
                  aria-label="github"
                >
                  git
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/polina-romanchuk-2b2543286/"
                  rel="noreferrer"
                  target="_blank"
                  aria-label="linkedin"
                >
                  linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
