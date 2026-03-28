import { useState, type ReactElement } from 'react';
import Search from '../search/Search';
import CardList from '../cardList/CardList';
import Header from '../header/Header';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useGetAllPokemonsQuery } from '../../services/pokemonApi';

const Main = (): ReactElement => {
  const [searchInput, setSearchInput] = useLocalStorage<string>(
    'searchInput',
    ''
  );
  const [hasError, setHasError] = useState(false);

  const { refetch } = useGetAllPokemonsQuery(1);

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  if (hasError) {
    throw new Error('Error example');
  }

  return (
    <>
      <Header />
      <main className="relative flex flex-col items-center justify-between gap-5 size-full">
        <Search onSearch={handleSearch} />
        <CardList searchName={searchInput} />
        <div className="absolute flex gap-3 -bottom-20 right-3">
          <button onClick={() => setHasError(true)}>error</button>
          <button onClick={() => refetch()}>reload</button>
        </div>
      </main>
    </>
  );
};

export default Main;
