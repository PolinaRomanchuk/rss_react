import { type ReactElement } from 'react';
import './table.css';
import type { Row } from '../../types/table-types';
import Spinner from '../spinner/Spinner';
import Filter from '../filter/Filter';

type TableProps = {
  rows: Row[];
  maxYear: number;
  filtredYear: number;
  setFiltredYear: React.Dispatch<React.SetStateAction<number>>;
};

const Table = ({
  rows,
  maxYear,
  filtredYear,
  setFiltredYear,
}: TableProps): ReactElement => {
  if (!rows.length) {
    return <Spinner />;
  }
  const yearToShow = filtredYear || maxYear;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>ISO code</th>
            <th>Population </th>
            <th>
              <Filter
                filterName="Year"
                filterData={Array.from(new Set(rows.map((x) => x.year)))}
                filtredInput={filtredYear}
                setFiltredInput={setFiltredYear}
              />
            </th>
            <th>CO2</th>
            <th>CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {rows
            .filter((x) => x.year == yearToShow)
            .map((row, i) => (
              <tr key={i}>
                <td>{row.country}</td>
                <td>{row.iso_code}</td>
                <td>{row.population?.toLocaleString() ?? 'N/A'}</td>
                <td>{row.year}</td>
                <td>{row.cement_co2?.toLocaleString() ?? 'N/A'}</td>
                <td>{row.cement_co2_per_capita ?? 'N/A'} </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
