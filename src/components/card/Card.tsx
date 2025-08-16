import { type ReactElement } from 'react';
import './card.css';
import { useTranslations } from 'next-intl';

type Props = {
  name: string;
  description: string;
  onClick: () => void;
  isChecked: boolean;
  onToggleCheckbox: () => void;
};

const Card = ({
  name,
  description,
  onClick,
  isChecked,
  onToggleCheckbox,
}: Props): ReactElement => {
  const translate = useTranslations();

  return (
    <div className="card">
      <div className="card-name">{name}</div>
      <div className="card-description">{description}</div>
      <button onClick={onClick} className="card_button">
        {translate('card.see-more-button-name')}
      </button>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggleCheckbox}
        aria-label={name}
      />
    </div>
  );
};

export default Card;
