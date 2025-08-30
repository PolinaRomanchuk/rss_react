import { useEffect, useState, type ReactElement } from 'react';
import './table.css';

type CountryRow = {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
};

type CountryData = {
  iso_code: string;
  data: CountryRow[];
};

type JSONData = {
  [country: string]: CountryData;
};

type Row = {
  country: string;
  iso_code: string;
  population?: number;
  year: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
};

const Table = (): ReactElement => {
  const [rows, setRows] = useState<Row[]>([]);
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    fetch('/owid-co2-data.json')
      .then((res) => res.json())
      .then((json: JSONData) => {
        const allRows: Row[] = [];
        Object.entries(json).forEach(([country, countryData]) => {
          countryData.data.forEach((row) => {
            allRows.push({
              country,
              iso_code: countryData.iso_code,
              population: row.population,
              year: row.year,
              cement_co2: row.cement_co2,
              cement_co2_per_capita: row.cement_co2_per_capita,
            });
          });
        });
        const maxYear = Math.max(...allRows.map((x) => x.year));
        setCurrentYear(maxYear);
        setRows(allRows);
      });
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>ISO code</th>
            <th>Population </th>
            <th>Year</th>
            <th>CO2</th>
            <th>CO2 per capita</th>
          </tr>
        </thead>
        <tbody>
          {rows
            .filter((x) => x.year == currentYear)
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
