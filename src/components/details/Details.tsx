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
              className="flex flex-col items-center gap-3 w-80 h-100"
              key={poke.name}
            >
              <div className="flex w-full gap-2 p-2 m-4">
                <span>№ {poke.order} </span>
                <span className="text-xl font-bold"> {poke.name}</span>
              </div>

              <img src={poke.image} alt={poke.image} />
              <div>
                {' '}
                <span>{poke.description}</span>
              </div>
              <div className="flex flex-col items-center w-full">
                <span>Abilities:</span>
                <div className="flex gap-2">
                  {poke.abilities?.map((x) => (
                    <span key={x.ability.name}>{x.ability.name}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {poke.stats?.map((x) => (
                  <div
                    key={x.stat.name}
                    className="flex flex-col items-center text-sm"
                  >
                    <span>{x.base_stat}</span>
                    <span>{x.stat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
