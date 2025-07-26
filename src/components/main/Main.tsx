import React from 'react';
import Search from '../search/Search';
import './main.css';
import CardList from '../cardList/CardList';
import Header from '../header/Header';

class Main extends React.Component {
  state = {
    searchInput: localStorage.getItem('searchInput')?.trim() || '',
    error: false,
  };

  handleSearch = (value: string) => {
    localStorage.setItem('searchInput', value);
    this.setState({ searchInput: value });
  };

  render() {
    if (this.state.error) {
      throw new Error('Error example');
    }
    return (
      <>
        <Header />
        <main className="main">
          <Search onSearch={this.handleSearch} />
          <CardList searchName={this.state.searchInput} />
          <div className="main_button-container">
            <button
              className="main_error-button"
              onClick={() => {
                this.setState({ error: true });
              }}
            >
              error
            </button>
          </div>
        </main>
      </>
    );
  }
}

export default Main;
