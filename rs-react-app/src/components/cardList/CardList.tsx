import React from 'react';
import Card from '../card/Card';
import './card-list.css';

class CardList extends React.Component {
  render() {
    return (
      <div className="card-list">
        <Card name={'name1'} description={'desc1'} />
        <Card name={'name2'} description={'desc2'} />
        <Card name={'name3'} description={'desc3'} />
      </div>
    );
  }
}

export default CardList;
