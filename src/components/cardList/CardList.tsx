import { useEffect, useRef, useState, type ReactElement } from 'react';
import Card from '../card/Card';
import { totalPage } from '../../services/pagination';
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

  const selectedCards = useSelector(
    (state: RootState) => state.cards.selectedCards
  );
  const dispatch = useDispatch();

  const {
    data: allData,
    error: allError,
    isFetching: allLoading,
  } = useGetAllPokemonsQuery(currentPage, { skip: !!searchName });

  const {
    data: searchedPokemon,
    error: searchError,
    isFetching: searchLoading,
  } = useGetPokemonByNameQuery(searchName ?? '', { skip: !searchName });

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

  useEffect(() => {
    if (pageFromUrl >= 1 && pageFromUrl <= totalPage) {
      setCurrentPage(pageFromUrl);
    } else {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }
  }, [pageFromUrl, setSearchParams]);

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const pokemons: Pokemon[] | undefined = searchName
    ? searchedPokemon
    : allData;

  return (
    <>
      <div className="flex w-full gap-5 mx-10">
        {loading && (
          <div className="flex justify-center size-full">
            <img
              src={loadingGif}
              alt="Loading..."
              className="object-cover w-40 "
            />
          </div>
        )}

        {error && (
          <p className="flex justify-center size-full">
            This pokemon does not found
          </p>
        )}

        {pokemons && !loading && (
          <div className="flex flex-col items-center gap-5 size-full">
            <div className="grid grid-flow-col grid-rows-2 gap-5">
              {pokemons &&
                pokemons?.map((pokemon) => (
                  <Card
                    name={pokemon.name}
                    image={pokemon.image}
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
              <div className="fixed z-10 flex flex-col items-center p-2 border rounded-sm bottom-5 left-5 border-main bg-base">
                <div className="flex gap-1">
                  {selectedCards.length}{' '}
                  {selectedCards.length == 1 ? (
                    <p>item is selected</p>
                  ) : (
                    <p>items are selected</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => dispatch(resetSelectedCards())}>
                    Unselect all
                  </button>
                  <button onClick={handleDownload}>Download</button>
                  <a ref={downloadLinkRef} className="hidden" />
                </div>
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
      {pokemons && pokemons.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => goToPage(Math.min(currentPage + 1, totalPage))}
            disabled={currentPage === totalPage}
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  );
};

export default CardList;
