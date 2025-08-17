import { type ReactElement } from 'react';
import './details.css';
import { useGetPokemonByNameQuery } from '../../services/pokemonApi';
import Image from 'next/image';

type Props = {
  name: string;
  onClose: () => void;
};

const Details = ({ name, onClose }: Props): ReactElement => {
  const {
    data: pokemonDetails,
    error: pokemonDetailsError,
    isFetching: pokemonDetailsLoading,
  } = useGetPokemonByNameQuery(name, { skip: !name });

  const pokemon = pokemonDetails;

  return (
    <div className="details">
      {pokemonDetailsLoading && (
        <Image
          width={50}
          height={50}
          src="/Pokeball.gif"
          alt="Loading..."
          className="loading-details-gif"
        />
      )}

      {pokemonDetailsError && <p className="error">Something went wrong</p>}

      {pokemon && !pokemonDetailsLoading && (
        <>
          <button onClick={onClose} className="close_button">
            x
          </button>
          {pokemon.map((poke) => (
            <div className="details_card" key={poke.name}>
              <Image
                src={poke.image}
                alt={poke.name}
                width={90}
                height={90}
                unoptimized={true}
              />
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
