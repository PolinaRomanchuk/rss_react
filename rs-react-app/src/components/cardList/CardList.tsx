import React from 'react';
import Card from '../card/Card';
import './card-list.css';

class CardList extends React.Component {
  render() {
    return (
      <div className="card-list">
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

export default CardList;
