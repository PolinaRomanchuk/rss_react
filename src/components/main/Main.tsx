'use client';
import { useState, type ReactElement } from 'react';
import Search from '../search/Search';
import './main.css';
import CardList from '../cardList/CardList';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useGetAllPokemonsQuery } from '../../services/pokemonApi';
import { useTranslations } from 'next-intl';

const Main = (): ReactElement => {
  const translate = useTranslations();
  const [searchInput, setSearchInput] = useLocalStorage<string>(
    'searchInput',
    ''
  );
  const [hasError, setHasError] = useState(false);

  const { refetch } = useGetAllPokemonsQuery(undefined);

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  if (hasError) {
    throw new Error('Error example');
  }

  return (
    <>
      <main className="main">
        <Search onSearch={handleSearch} />
        <CardList searchName={searchInput} />
        <div className="main_button-container">
          <button
            className="main_error-button"
            onClick={() => setHasError(true)}
          >
            {translate('error')}
          </button>
          <button onClick={() => refetch()}>{translate('reload')}</button>
        </div>
      </main>
    </>
  );
};

export default Main;
