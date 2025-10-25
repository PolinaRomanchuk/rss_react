import { type ReactElement } from 'react';
import loadingGif from '../../assets/Pokeball.gif';
import { useGetPokemonByNameQuery } from '../../services/pokemonApi';

type Props = {
  name: string;
  onClose: () => void;
};

const Details = ({ name, onClose }: Props): ReactElement => {
  const {
    data: pokemonDetails,
    error: pokemonDetailsError,
    isFetching: pokemonDetailsLoading,
  } = useGetPokemonByNameQuery(name ?? '', { skip: !name });

  const pokemon = pokemonDetails;

  return (
    <div className="flex flex-col items-center justify-center m-5 w-90">
      {pokemonDetailsLoading && (
        <img src={loadingGif} alt="Loading..." className="w-20" />
      )}

      {pokemonDetailsError && <p>Something went wrong</p>}

      {pokemon && !pokemonDetailsLoading && (
        <div className="relative flex flex-col p-3 border rounded-md border-main bg-card-bg">
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center w-5 h-5 p-0 top-1 right-1"
          >
            x
          </button>
          {pokemon.map((poke) => (
            <div
              className="flex flex-col items-center gap-3 w-60 h-90"
              key={poke.name}
            >
              <img src={poke.image} alt={poke.image} />
              <div>{poke.name}</div>
              <div>{poke.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
