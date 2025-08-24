import { useRef, useState, type ReactElement } from 'react';
import { useStore } from '../store/store';
import type { FormField } from '../type/form';
import './countries.css';

type ControlledProps = {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  validateField: (field: FormField, value: unknown) => void;
};

type UncontrolledProps = {
  defaultValue: string;
};

type AutocompletedCountryProps = ControlledProps | UncontrolledProps;

const AutocompletedCountry = (
  props: AutocompletedCountryProps
): ReactElement => {
  const countries = useStore((state) => state.countries);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if ('setCountry' in props) {
      props.setCountry(value);
    }
    if ('validateField' in props) {
      props.validateField('country', value);
    }

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
    if ('setCountry' in props) {
      props.setCountry(country);
    }
    if ('validateField' in props) {
      props.validateField('country', country);
    }
    if (inputRef.current) {
      inputRef.current.value = country;
    }
    setFilteredCountries([]);
  };

  return (
    <div className="form_input-container country_input">
      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        onChange={handleChange}
        autoComplete="off"
        onBlur={() => {
          setTimeout(() => setFilteredCountries([]), 100);
        }}
        {...('country' in props
          ? { value: props.country }
          : { defaultValue: props.defaultValue ?? '' })}
        ref={inputRef}
        name="country"
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
