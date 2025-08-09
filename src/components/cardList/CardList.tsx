import { useEffect, useRef, useState, type ReactElement } from 'react';
import Card from '../card/Card';
import './card-list.css';
import { getTotalPages, productsPerPage } from '../../services/pagination';
import loadingGif from '../../assets/Loading animation.gif';
import type { Pokemon } from '../../type/pokemon';
import { useSearchParams } from 'react-router';
import Details from '../details/Details';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetSelectedCards,
  toggleCard,
  type RootState,
} from '../../store/store';
import { getDownloadUrl } from '../../services/download';
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../../services/pokemonApi';

interface CardListProps {
  searchName?: string;
}

const CardList = ({ searchName }: CardListProps): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const detailName = searchParams.get('details');

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);
  const dispatch = useDispatch();

  const {
    data: allPokemons,
    error: allError,
    isFetching: allLoading,
  } = useGetAllPokemonsQuery(undefined, { skip: !!searchName });

  const {
    data: searchedPokemon,
    error: searchError,
    isFetching: searchLoading,
  } = useGetPokemonByNameQuery(searchName!, { skip: !searchName });

  const pokemons: Pokemon[] | undefined = searchName
    ? searchedPokemon
    : allPokemons;

  const loading = searchName ? searchLoading : allLoading;
  const error = searchName ? searchError : allError;
  const totalpage = pokemons ? getTotalPages(pokemons.length) : 1;

  useEffect(() => {
    if (searchName) {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }
  }, [searchName]);

  useEffect(() => {
    if (pageFromUrl >= 1 || pageFromUrl < totalpage) {
      setCurrentPage(pageFromUrl);
    } else {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }
  }, [pageFromUrl, setSearchParams, totalpage]);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedPokemons = pokemons
    ? pokemons.slice(startIndex, startIndex + productsPerPage)
    : [];

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const handleDownload = async () => {
    const { href, filename } = await getDownloadUrl(selectedCards);
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = href;
      downloadLinkRef.current.download = filename;
      downloadLinkRef.current.click();
    }
  };

  return (
    <>
      <div className="card-list">
        {loading && (
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        )}

        {error && <p className="error">This pokemon does not found</p>}

        {pokemons && !loading && (
          <div className="card-list-with-pagination">
            <div className="cards">
              {pokemons.length > 0 &&
                paginatedPokemons.map((pokemon) => (
                  <Card
                    name={pokemon.name}
                    description={pokemon.description}
                    key={pokemon.name}
                    onClick={() => {
                      searchParams.set('details', pokemon.name);
                      setSearchParams(searchParams);
                    }}
                    isChecked={selectedCards?.includes(pokemon.name)}
                    onToggleCheckbox={() => dispatch(toggleCard(pokemon.name))}
                  />
                ))}
            </div>

            {selectedCards?.length > 0 && (
              <div className="flyout-element">
                <p>{selectedCards.length} items are selected</p>
                <div className="flyout-element_button-container">
                  <button onClick={() => dispatch(resetSelectedCards())}>
                    Unselect all
                  </button>
                  <button onClick={handleDownload}>Download</button>
                  <a ref={downloadLinkRef} className="hidden_link" />
                </div>
              </div>
            )}

            {pokemons && pokemons.length > 1 && (
              <div className="pagination_container">
                <button
                  className="pagination_button"
                  onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {'<'}
                </button>
                <span>{currentPage}</span>
                <button
                  className="pagination_button"
                  onClick={() => goToPage(Math.min(currentPage + 1, totalpage))}
                  disabled={currentPage === totalpage}
                >
                  {'>'}
                </button>
              </div>
            )}
          </div>
        )}

        {detailName && (
          <Details
            name={detailName}
            onClose={() => {
              searchParams.delete('details');
              setSearchParams(searchParams);
            }}
          />
        )}
      </div>
    </>
  );
};

export default CardList;
