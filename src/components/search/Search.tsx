import React, { type ReactElement } from 'react';
import '../search/search.css';
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
    <div className="search">
      <input
        className="search_input"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="enter full name, eg bulbasaur"
      />
      <button className="search_button" onClick={handleSearch}>
        search
      </button>
    </div>
  );
};

export default Search;
