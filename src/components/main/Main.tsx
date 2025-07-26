import { useState, type ReactElement } from 'react';
import Search from '../search/Search';
import './main.css';
import CardList from '../cardList/CardList';
import Header from '../header/Header';
import { useLocalStorage } from '../../utils/useLocalStorage';

const Main = (): ReactElement => {
  const [searchInput, setSearchInput] = useLocalStorage<string>(
    'searchInput',
    ''
  );
  const [hasError, setHasError] = useState(false);

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  if (hasError) {
    throw new Error('Error example');
  }

  return (
    <>
      <Header />
      <main className="main">
        <Search onSearch={handleSearch} />
        <CardList searchName={searchInput} />
        <div className="main_button-container">
          <button
            className="main_error-button"
            onClick={() => setHasError(true)}
          >
            error
          </button>
        </div>
      </main>
    </>
  );
};

export default Main;
