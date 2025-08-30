import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import type { Row } from './types/table-types';
import { fetchAllCountries } from './services/fetchData';
import Spinner from './components/spinner/Spinner';

const Table = lazy(() => import('./components/table/Table'));

function App() {
  const [rows, setRows] = useState<Row[]>([]);
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    (async function fetchData() {
      const { maxYear, rows } = await fetchAllCountries();
      setCurrentYear(maxYear);
      setRows(rows);
    })();
  }, []);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Table rows={rows} currentYear={currentYear} />
      </Suspense>
    </>
  );
}

export default App;
