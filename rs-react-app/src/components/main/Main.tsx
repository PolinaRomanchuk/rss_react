import React from 'react';
import Search from '../search/Search';
import './main.css';
import CardList from '../cardList/CardList';

class Main extends React.Component {
  state = {
    searchInput: localStorage.getItem('searchInput')?.trim() || '',
  };

  handleSearch = (value: string) => {
    localStorage.setItem('searchInput', value);
    this.setState({ searchInput: value });
  };

  render() {
    return (
      <main className="main">
        <Search onSearch={this.handleSearch} />
        <CardList name={this.state.searchInput} />
        <div className="main_button-container">
          <button className="main_error-button">error</button>
        </div>
      </main>
    );
  }
}

export default Main;
