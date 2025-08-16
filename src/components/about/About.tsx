import type { ReactElement } from 'react';
import './about.css';
import Mail from '../../assets/envelope.svg';
import GitHub from '../../assets/github.svg';
import Linkedin from '../../assets/linkedin.svg';
import { useTheme } from '../context/ThemeContext';
import { useTranslations } from 'next-intl';

const About = (): ReactElement => {
  const { isDark } = useTheme();
  const translate = useTranslations();

  return (
    <>
      <div className="about">
        <div className="about_photo-name-container">
          <img src="./polina.jpg" alt="photo" />
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
                  <Mail
                    className={isDark ? 'about_icon dark' : 'about_icon '}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PolinaRomanchuk"
                  rel="noreferrer"
                  target="_blank"
                  aria-label="github"
                >
                  <GitHub
                    className={isDark ? 'about_icon dark' : 'about_icon '}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/polina-romanchuk-2b2543286/"
                  rel="noreferrer"
                  target="_blank"
                  aria-label="linkedin"
                >
                  <Linkedin
                    className={isDark ? 'about_icon dark' : 'about_icon '}
                  />
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
