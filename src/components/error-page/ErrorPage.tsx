import type { ReactElement } from 'react';
import Pokeball from '../../assets/pokeball.png';
import './error-page.css';
import { Link } from 'react-router';

const ErrorPage = (): ReactElement => {
  return (
    <div className="error-page">
      <div className="error-page_error-text-container">
        <p>4</p>
        <div className="error-page_image-container">
          <img src={Pokeball} alt="0" />
        </div>
        <p>4</p>
      </div>
      <p className="error-page_title">Not found</p>
      <p className="error-page_subtitle">
        The page you are looking for does not exist
      </p>
      <div className="error-page_link-container">
        <Link to="/" className="error-page_link">
          Go home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
