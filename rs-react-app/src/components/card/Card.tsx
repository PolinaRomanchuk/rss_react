import React from 'react';
import './card.css';

type Props = {
  name: string;
  description: string;
};

class Card extends React.Component<Props> {
  render() {
    return (
      <div className="card">
        <div className="card-name">{this.props.name}</div>
        <div className="card-description">{this.props.description}</div>
      </div>
    );
  }
}

export default Card;
