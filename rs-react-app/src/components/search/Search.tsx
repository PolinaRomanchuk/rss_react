import React from 'react';
import '../search/search.css';

class Search extends React.Component {
  state = {
    searchInput: '',
  };

  componentDidMount() {
    const savedSearchInput = localStorage.getItem('searchInput');
    if (savedSearchInput) {
      this.setState({ searchInput: savedSearchInput });
    }
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  handleSearch = () => {
    localStorage.setItem('searchInput', this.state.searchInput);
  };

  render() {
    return (
      <div className="search">
        <input
          className="search_input"
          value={this.state.searchInput}
          onChange={this.handleSearchInputChange}
        />
        <button className="search_button" onClick={this.handleSearch}>
          search
        </button>
      </div>
    );
  }
}

export default Search;
