import { type ReactElement } from 'react';
import './card.css';

type Props = {
  name: string;
  description: string;
  onClick: () => void;
};

const Card = ({ name, description, onClick }: Props): ReactElement => {
  return (
    <div className="card">
      <div className="card-name">{name}</div>
      <div className="card-description">{description}</div>
      <button onClick={onClick}>see more</button>
    </div>
  );
};

export default Card;
