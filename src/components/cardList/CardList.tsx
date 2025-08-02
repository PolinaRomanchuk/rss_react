import { useEffect, useRef, useState, type ReactElement } from 'react';
import Card from '../card/Card';
import './card-list.css';
import { fetchAllPokemons, fetchPokemonByName } from '../../services/API';
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

interface CardListProps {
  searchName?: string;
}

const CardList = ({ searchName }: CardListProps): ReactElement => {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [totalpage, setTotalPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const detailName = searchParams.get('details');

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const selectedCards = useSelector((state: RootState) => state.selectedCards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pageFromUrl >= 1 || pageFromUrl < totalpage) {
      setCurrentPage(pageFromUrl);
    } else {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }
  }, [pageFromUrl, setSearchParams, totalpage]);

  const loadPokemon = async () => {
    try {
      if (searchName) {
        const result = await fetchPokemonByName(searchName);
        setPokemons(result);
        setTotalPage(1);
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
    if (searchName) {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }
  }, [searchName]);

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
        {!pokemons && <img src={loadingGif} alt="Loading..." />}
        <div className="card-list-with-pagination">
          <div className="cards">
            {pokemons &&
              pokemons.length > 0 &&
              paginatedPokemons.map((pokemon) => (
                <Card
                  name={pokemon.name}
                  description={pokemon.description}
                  key={pokemon.name}
                  onClick={() => {
                    searchParams.set('details', pokemon.name);
                    setSearchParams(searchParams);
                  }}
                  isChecked={selectedCards.includes(pokemon.name)}
                  onToggleCheckbox={() => dispatch(toggleCard(pokemon.name))}
                />
              ))}
          </div>

          {selectedCards.length > 0 && (
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
