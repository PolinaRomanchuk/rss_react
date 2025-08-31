import { useEffect, useRef, useState, type ReactElement } from 'react';
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

  const [highlightedCells, setHighlightedCells] = useState<
    Record<string, boolean>
  >({});

  const prevRowsRef = useRef<Row[]>([]);

  const yearToShow = filtredYear || maxYear;
  const filteredRows = rows.filter((x) => x.year === yearToShow);
  const sortedRows = filteredRows.sort((a, b) => {
    const popA = a.population ?? 0;
    const popB = b.population ?? 0;

    return sortOrder === 'asc' ? popA - popB : popB - popA;
  });

  useEffect(() => {
    const prevRows = prevRowsRef.current;
    const newHighlights: Record<string, boolean> = {};

    sortedRows.forEach((row, rowIndex) => {
      const prevRow = prevRows[rowIndex];
      if (!prevRow) return;

      Object.keys(row).forEach((key) => {
        const k = key as keyof Row;
        if (row[k] !== prevRow[k]) {
          newHighlights[`${rowIndex}-${key}`] = true;
        }
      });
    });

    if (Object.keys(newHighlights).length > 0) {
      setHighlightedCells(newHighlights);

      const timeout = setTimeout(() => setHighlightedCells({}), 2000);

      return () => clearTimeout(timeout);
    }
  }, [rows, filtredYear]);

  useEffect(() => {
    prevRowsRef.current = sortedRows.map((r) => ({ ...r }));
  }, [sortedRows]);

  const availableColumns = getAvailableColumns(filteredRows);

  if (!rows.length) {
    return <Spinner />;
  }

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
              <td
                className={highlightedCells[`${i}-country`] ? 'highlight' : ''}
              >
                {row.country}
              </td>
              <td
                className={highlightedCells[`${i}-iso_code`] ? 'highlight' : ''}
              >
                {row.iso_code}
              </td>
              <td
                className={
                  highlightedCells[`${i}-population`] ? 'highlight' : ''
                }
              >
                {row.population?.toLocaleString() ?? 'N/A'}
              </td>
              <td className={highlightedCells[`${i}-year`] ? 'highlight' : ''}>
                {row.year}
              </td>
              <td
                className={
                  highlightedCells[`${i}-cement_co2`] ? 'highlight' : ''
                }
              >
                {row.cement_co2?.toLocaleString() ?? 'N/A'}
              </td>
              <td
                className={
                  highlightedCells[`${i}-cement_co2_per_capita`]
                    ? 'highlight'
                    : ''
                }
              >
                {row.cement_co2_per_capita ?? 'N/A'}{' '}
              </td>
              {extraColumns.map((col) => (
                <td
                  key={col}
                  className={highlightedCells[`${i}-${col}`] ? 'highlight' : ''}
                >
                  {row[col as keyof Row] ?? 'N/A'}
                </td>
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
