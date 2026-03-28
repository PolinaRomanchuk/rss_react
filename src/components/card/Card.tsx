import { type ReactElement } from 'react';

type Props = {
  name: string;
  image: string;
  onClick: () => void;
  isChecked: boolean;
  onToggleCheckbox: () => void;
};

const Card = ({
  name,
  image,
  onClick,
  isChecked,
  onToggleCheckbox,
}: Props): ReactElement => {
  return (
    <div className="relative flex flex-col gap-2 p-5 border rounded-sm border-card-bg bg-card-bg w-50">
      <img src={image} alt="pokemon" className="size-40" />
      <div>{name}</div>

      <button onClick={onClick}>see more</button>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggleCheckbox}
        aria-label={name}
        className="absolute cursor-pointer right-1 top-1 bg-card-bg accent-white"
      />
    </div>
  );
};

export default Card;
