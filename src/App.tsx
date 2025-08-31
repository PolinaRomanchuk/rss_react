import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import type { Row } from './types/table-types';
import { fetchAllCountries, fetchCountryByName } from './services/fetchData';
import Spinner from './components/spinner/Spinner';
import Search from './components/search/Search';

const Table = lazy(() => import('./components/table/Table'));

function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [maxYear, setMaxYear] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [error, setError] = useState('');

  const [filtredYear, setFiltredYear] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        const { maxYear, rows } = searchWord
          ? await fetchCountryByName(searchWord)
          : await fetchAllCountries();
        setMaxYear(maxYear);
        setRows(rows);
      } catch (error) {
        if (error instanceof Error) {
          setError('This country does not find');
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchWord]);

  return (
    <>
      <Search setSearchWord={setSearchWord} />
      <Suspense fallback={<Spinner />}>
        {loading ? (
          <Spinner />
        ) : !error ? (
          <Table
            rows={rows}
            maxYear={maxYear}
            filtredYear={filtredYear}
            setFiltredYear={setFiltredYear}
          />
        ) : (
          <div className="error_message">{error}</div>
        )}
      </Suspense>
    </>
  );
}

export default App;
