import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import type { Row } from './types/table-types';
import { fetchAllCountries, fetchCountryByName } from './services/fetchData';
import Spinner from './components/spinner/Spinner';
import Search from './components/search/Search';

const Table = lazy(() => import('./components/table/Table'));

function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [currentYear, setCurrentYear] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        const { maxYear, rows } = searchWord
          ? await fetchCountryByName(searchWord)
          : await fetchAllCountries();
        setCurrentYear(maxYear);
        setRows(rows);
      } catch (error) {
        if (error instanceof Error) {
          setError('This country does not find');
        } else {
          setError('Something went wrong');
        }
      }
    };

    fetchData();
  }, [searchWord]);

  return (
    <>
      <Search setSearchWord={setSearchWord} />
      <Suspense fallback={<Spinner />}>
        {!error ? (
          <Table rows={rows} currentYear={currentYear} />
        ) : (
          <div className="error_message">{error}</div>
        )}
      </Suspense>
    </>
  );
}

export default App;
