import { useEffect, useRef, useState, type ReactElement } from 'react';
import Card from '../card/Card';
import './card-list.css';
import { getTotalPages, productsPerPage } from '../../services/pagination';
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
import { useTranslations } from 'next-intl';

interface CardListProps {
  searchName?: string;
}

const CardList = ({ searchName }: CardListProps): ReactElement => {
  const translate = useTranslations();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const detailName = searchParams.get('details');

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const selectedCards = useSelector(
    (state: RootState) => state.cards.selectedCards
  );
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
  } = useGetPokemonByNameQuery(searchName, { skip: !searchName });

  const loading = searchName ? searchLoading : allLoading;
  const error = searchName ? searchError : allError;

  useEffect(() => {
    if (searchName) {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }
  }, [searchName]);

  const handleDownload = async () => {
    const { href, filename } = await getDownloadUrl(selectedCards);
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = href;
      downloadLinkRef.current.download = filename;
      downloadLinkRef.current.click();
    }
  };

  const { data: paginatedPokemons } = useGetAllPokemonsQuery(undefined, {
    selectFromResult: ({ data }) => {
      if (!data) return { data: undefined };

      const start = (currentPage - 1) * productsPerPage;
      const end = start + productsPerPage;
      return {
        data: data.slice(start, end),
      };
    },
  });

  const totalPage = allPokemons ? getTotalPages(allPokemons.length) : 1;

  useEffect(() => {
    if (pageFromUrl >= 1 && pageFromUrl <= totalPage) {
      setCurrentPage(pageFromUrl);
    } else {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }
  }, [pageFromUrl, setSearchParams, totalPage]);

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const pokemons: Pokemon[] | undefined = searchName
    ? searchedPokemon
    : paginatedPokemons;

  return (
    <>
      <div className="card-list">
        {loading && (
          <img src="./loading.gif" alt="Loading..." className="loading-gif" />
        )}

        {error && <p className="error">{translate('cardList.search-error')}</p>}

        {pokemons && !loading && (
          <div className="card-list-with-pagination">
            <div className="cards">
              {pokemons &&
                pokemons?.map((pokemon) => (
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
                <p>
                  {selectedCards.length} {translate('cardList.select-message')}
                </p>
                <div className="flyout-element_button-container">
                  <button onClick={() => dispatch(resetSelectedCards())}>
                    {translate('cardList.unselect-button-name')}
                  </button>
                  <button onClick={handleDownload}>
                    {translate('cardList.download-button-name')}
                  </button>
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
                  onClick={() => goToPage(Math.min(currentPage + 1, totalPage))}
                  disabled={currentPage === totalPage}
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
