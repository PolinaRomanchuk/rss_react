import { useState, type ReactElement } from 'react';
import './table.css';
import type { Row } from '../../types/table-types';
import Spinner from '../spinner/Spinner';
import Filter from '../filter/Filter';
import Sort from '../sort/Sort';
import Modal from '../modal/Modal';
import { getAvailableColumns } from '../../services/fetchData';

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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showModal, setShowModal] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);

  if (!rows.length) {
    return <Spinner />;
  }
  const yearToShow = filtredYear || maxYear;
  const filteredRows = rows.filter((x) => x.year === yearToShow);
  const sortedRows = filteredRows.sort((a, b) => {
    const popA = a.population ?? 0;
    const popB = b.population ?? 0;

    return sortOrder === 'asc' ? popA - popB : popB - popA;
  });

  const availableColumns = getAvailableColumns(filteredRows);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>ISO code</th>
            <th>
              <Sort sortName="Population" setSortOrder={setSortOrder} />
            </th>
            <th>
              <Filter
                filterName="Year"
                filterData={Array.from(new Set(rows.map((x) => x.year)))}
                setFiltredInput={setFiltredYear}
              />
            </th>
            <th>CO2</th>
            <th>CO2 per capita</th>
            {extraColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th>
              <button
                onClick={() => setShowModal(true)}
                className="add-columns_button"
              >
                Add Columns
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <tr key={i}>
              <td>{row.country}</td>
              <td>{row.iso_code}</td>
              <td>{row.population?.toLocaleString() ?? 'N/A'}</td>
              <td>{row.year}</td>
              <td>{row.cement_co2?.toLocaleString() ?? 'N/A'}</td>
              <td>{row.cement_co2_per_capita ?? 'N/A'} </td>
              {extraColumns.map((col) => (
                <td key={col}>{row[col as keyof Row] ?? 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={showModal}
        setShow={setShowModal}
        columns={availableColumns}
        selectedColumns={extraColumns}
        setSelectedColumns={setExtraColumns}
      />
    </>
  );
};

export default Table;
