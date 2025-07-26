import { type ReactElement } from 'react';
import './card.css';

type Props = {
  name: string;
  description: string;
};

const Card = ({ name, description }: Props): ReactElement => {
  return (
    <div className="card">
      <div className="card-name">{name}</div>
      <div className="card-description">{description}</div>
    </div>
  );
};

export default Card;
