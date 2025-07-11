import React from 'react';
import '../search/search.css';

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <input className="search_input" />
        <button className="search_button">search</button>
      </div>
    );
  }
}

export default Search;
