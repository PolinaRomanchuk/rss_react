import React from 'react';
import './card.css';

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-name">name</div>
        <div className="card-description">description</div>
      </div>
    );
  }
}

export default Card;
