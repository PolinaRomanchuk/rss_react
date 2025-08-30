import { useState, type ReactElement } from 'react';
import Icon from '../../assets/filter.png';
import './filter.css';

type FilterProps = {
  filterName: string;
  filterData: number[];
  setFiltredInput: React.Dispatch<React.SetStateAction<number>>;
};

const Filter = ({
  filterName,
  filterData,
  setFiltredInput,
}: FilterProps): ReactElement => {
  const [isShow, setIsShow] = useState(false);

  const handleSelect = (input: number) => {
    setFiltredInput(input);
  };

  return (
    <div
      className="filter_container"
      onClick={() => setIsShow((prev) => !prev)}
    >
      <div className="filter_name">{filterName}</div>
      <img src={Icon} alt="filter-icon" className="filter-icon" />
      {isShow && (
        <ul className="filter_list-items">
          {filterData.map((data) => (
            <li
              key={data}
              className="filter_item"
              onClick={() => handleSelect(data)}
            >
              {data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
