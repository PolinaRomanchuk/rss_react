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
      </main>
    );
  }
}

export default Main;
