import { useEffect, useState, type ReactElement } from 'react';
import Card from '../card/Card';
import './card-list.css';
import { fetchAllPokemons, fetchPokemonByName } from '../../services/API';
import { getTotalPages, productsPerPage } from '../../services/pagination';

import loadingGif from '../../assets/Loading animation.gif';
import type { Pokemon } from '../../type/pokemon';

const CardList = (): ReactElement => {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpage, setTotalPage] = useState(1);

  const loadPokemon = async (name?: string) => {
    try {
      if (name) {
        const result = await fetchPokemonByName(name);
        setPokemons(result);
      } else {
        const result = await fetchAllPokemons();
        setPokemons(result);
        setTotalPage(getTotalPages(result.length));
      }
    } catch (error: unknown) {
      localStorage.setItem('searchInput', '');
      void error;
    }
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedPokemons = pokemons
    ? pokemons.slice(startIndex, startIndex + productsPerPage)
    : [];

  return (
    <>
      <div className="card-list">
        {!pokemons && <img src={loadingGif} alt="Loading..." />}
        {pokemons &&
          pokemons.length > 0 &&
          paginatedPokemons.map((pokemon) => (
            <Card
              name={pokemon.name}
              description={pokemon.description}
              key={pokemon.name}
            />
          ))}
      </div>

      {pokemons && pokemons.length > 1 && (
        <div className="pagination_container">
          <button
            className="pagination_button"
            onClick={() =>
              setCurrentPage((previous) => Math.max(previous - 1, 1))
            }
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span>{currentPage}</span>
          <button
            className="pagination_button"
            onClick={() =>
              setCurrentPage((previous) => Math.min(previous + 1, totalpage))
            }
            disabled={currentPage === totalpage}
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  );
};

export default CardList;
