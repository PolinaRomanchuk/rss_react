import { useState, type ReactElement } from 'react';
import './search.css';
import Icon from '../../assets/search.png';

type SearchProps = {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ setSearchWord }: SearchProps): ReactElement => {
  const [input, setInput] = useState('');

  const handleClick = () => {
    const capitalized =
      input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    setSearchWord(capitalized);
  };

  return (
    <div className="search_container">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="enter a country"
      />
      <button className="search_icon_container" onClick={handleClick}>
        <img src={Icon} alt="search-icon" />
      </button>
    </div>
  );
};
export default Search;
