import type { ReactElement } from 'react';
import Header from '../header/Header';
import './about.css';
import Photo from '../../assets/polina.jpg';
import Mail from '../../assets/envelope.png';
import GitHub from '../../assets/github.png';
import Linkedin from '../../assets/linkedin.png';

const About = (): ReactElement => {
  return (
    <>
      <Header />
      <div className="about">
        <div className="about_photo-name-container">
          <img src={Photo} alt="photo" />
          <p>Polina Romanchuk</p>
        </div>
        <div className="about_cours-info">
          This project was created as part of the RS School courses. To learn
          more about the program, visit{' '}
          <a
            target="_blank"
            href="https://rs.school/courses/reactjs"
            rel="noreferrer"
            className="about_rss-link"
          >
            RS School website.
          </a>
          <div className="about_contacts">
            <span>Contact:</span>
            <ul>
              <li>
                <a href="mailto:polina.romanchuk99@mail.ru" rel="noreferrer">
                  <img src={Mail} alt="mail" className="about_icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PolinaRomanchuk"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={GitHub} alt="github" className="about_icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/polina-romanchuk-2b2543286/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={Linkedin} alt="linkedin" className="about_icon" />
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
