import React from 'react';
import '../search/search.css';

interface SearchProps {
  onSearch: (value: string) => void;
}

class Search extends React.Component<SearchProps> {
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
    this.props.onSearch(this.state.searchInput);
  };

  render() {
    return (
      <div className="search">
        <input
          className="search_input"
          value={this.state.searchInput}
          onChange={this.handleSearchInputChange}
          placeholder="enter full name, eg bulbasaur"
        />
        <button className="search_button" onClick={this.handleSearch}>
          search
        </button>
      </div>
    );
  }
}

export default Search;
