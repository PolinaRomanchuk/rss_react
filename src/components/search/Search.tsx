import React, { type ReactElement } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search = ({ onSearch }: SearchProps): ReactElement => {
  const [searchInput, setSearchInput] = useLocalStorage<string>(
    'searchInput',
    ''
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <div className="flex justify-center gap-1 w-96">
      <input
        className="w-100"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="enter full name, eg bulbasaur"
      />
      <button onClick={handleSearch}>search</button>
    </div>
  );
};

export default Search;
