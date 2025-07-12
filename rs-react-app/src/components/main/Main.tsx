import React from 'react';
import Search from '../search/Search';
import './main.css';
import CardList from '../cardList/CardList';

class Main extends React.Component {
  render() {
    return (
      <main className="main">
        <Search />
        <CardList />
        <div className="main_button-container">
          <button className="main_error-button">error</button>
        </div>
      </main>
    );
  }
}

export default Main;
