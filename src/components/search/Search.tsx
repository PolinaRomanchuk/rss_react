'use client';
import React, { type ReactElement } from 'react';
import '../search/search.css';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { useTranslations } from 'next-intl';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search = ({ onSearch }: SearchProps): ReactElement => {
  const translate = useTranslations();

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
        placeholder={translate('search.search-placeholder')}
      />
      <button className="search_button" onClick={handleSearch}>
        {translate('search.search-button-name')}
      </button>
    </div>
  );
};

export default Search;
