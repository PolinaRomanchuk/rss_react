import React from 'react';
import Search from '../search/Search';
import './main.css';

class Main extends React.Component {
  render() {
    return (
      <main className="main">
        <Search />
      </main>
    );
  }
}

export default Main;
