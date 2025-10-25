import type { ReactElement } from 'react';
import Pokeball from '../../assets/pokeball.png';
import { Link } from 'react-router';

const ErrorPage = (): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <div className="flex items-center gap-3">
        <p className="text-9xl">4</p>
        <div className="w-50">
          <img src={Pokeball} alt="0" />
        </div>
        <p className="text-9xl">4</p>
      </div>
      <p className="text-5xl">Not found</p>
      <p className="text-xl">The page you are looking for does not exist</p>
      <button>
        <Link to="/">Go home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
