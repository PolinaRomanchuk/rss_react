import type { JSONData, Row } from '../types/table-types';
export type AllCountriesResponse = {
  maxYear: number;
  rows: Row[];
};
export const fetchAllCountries = async (): Promise<AllCountriesResponse> => {
  try {
    const res = await fetch('/owid-co2-data.json');
    const json: JSONData = await res.json();
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

    return { maxYear, rows: allRows };
  } catch (error) {
    console.log(error);
    throw Error('Something went wrong');
  }
};
