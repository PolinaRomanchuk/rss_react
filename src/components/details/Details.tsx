import { useEffect, useState, type ReactElement } from 'react';
import type { Pokemon } from '../../type/pokemon';
import { fetchPokemonByName } from '../../services/API';
import './details.css';
import loadingGif from '../../assets/Pokeball.gif';

type Props = {
  name: string;
  onClose: () => void;
};

const Details = ({ name, onClose }: Props): ReactElement => {
  const [pokemon, setPokemon] = useState<Pokemon[]>();

  useEffect(() => {
    fetchPokemonByName(name)
      .then(setPokemon)
      .catch(() => {});
  }, [name]);

  return (
    <div className="details">
      {!pokemon && (
        <img
          src={loadingGif}
          alt="Loading..."
          className="loading-details-gif"
        />
      )}
      {pokemon && (
        <>
          <button onClick={onClose} className="close_button">
            x
          </button>
          {pokemon.map((poke) => (
            <div className="details_card" key={poke.name}>
              <img src={poke.image} alt={poke.image} />
              <div className="details-name">{poke.name}</div>
              <div className="details-description">{poke.description}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Details;
