import { useState, type ReactElement } from 'react';
import { useStore } from '../store/store';
import type { FormField } from '../type/form';
import './countries.css';

type AutocompletedCountryProps = {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  validateField: (field: FormField, value: unknown) => void;
};

const AutocompletedCountry = ({
  setCountry,
  country,
  validateField,
}: AutocompletedCountryProps): ReactElement => {
  const countries = useStore((state) => state.countries);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountry(value);
    validateField('country', value);

    if (value === '') {
      setFilteredCountries([]);
      return;
    }

    const filtered = countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSelect = (country: string) => {
    setCountry(country);
    validateField('country', country);
    setFilteredCountries([]);
  };

  return (
    <div className="form_input-container country_input">
      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={country}
        onChange={handleChange}
        autoComplete="off"
        onBlur={() => {
          setTimeout(() => setFilteredCountries([]), 100);
        }}
      />
      {filteredCountries.length > 0 && (
        <ul className="country_ul">
          {filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleSelect(country)}
              className="country_li"
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompletedCountry;
