import type { ReactElement } from 'react';
import Header from '../header/Header';
import Photo from '../../assets/polina.jpg';
import Mail from '../../assets/envelope.svg?react';
import GitHub from '../../assets/github.svg?react';
import Linkedin from '../../assets/linkedin.svg?react';

const About = (): ReactElement => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-10 h-90">
        <div className="flex items-center gap-5">
          <img
            src={Photo}
            alt="photo"
            className="object-cover rounded-full size-20"
          />
          <p>Polina Romanchuk</p>
        </div>
        <div>
          This project was created as part of the RS School courses. To learn
          more about the program, visit{' '}
          <a
            target="_blank"
            href="https://rs.school/courses/reactjs"
            rel="noreferrer"
            className="transition-colors duration-300 text-accent-orange hover:text-main-contrast"
          >
            RS School website.
          </a>
          <div className="flex items-center gap-5">
            <p>Contact:</p>
            <ul className="flex gap-4">
              <li>
                <a
                  href="mailto:polina.romanchuk99@mail.ru"
                  rel="noreferrer"
                  aria-label="mail"
                >
                  <Mail className="transition-colors duration-300 size-10 fill-main hover:fill-accent-orange" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PolinaRomanchuk"
                  rel="noreferrer"
                  target="_blank"
                  aria-label="github"
                >
                  <GitHub className="transition-colors duration-300 size-10 fill-main hover:fill-accent-orange" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/polina-romanchuk-2b2543286/"
                  rel="noreferrer"
                  target="_blank"
                  aria-label="linkedin"
                >
                  <Linkedin className="transition-colors duration-300 size-10 fill-main hover:fill-accent-orange" />
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
