export type CountryRow = {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
};

export type CountryData = {
  iso_code: string;
  data: CountryRow[];
};

export type JSONData = {
  [country: string]: CountryData;
};

export type Row = {
  country: string;
  iso_code: string;
  population?: number;
  year: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
};
