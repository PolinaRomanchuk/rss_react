import { useCallback, type ReactElement } from 'react';
import Icon from '../../assets/arrow.png';
import './sort.css';

type SortProps = {
  sortName: string;
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
};

const Sort = ({ sortName, setSortOrder }: SortProps): ReactElement => {
  const handleSortClick = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, [setSortOrder]);

  return (
    <div className="sort_container" onClick={handleSortClick}>
      <div className="sortr_name">{sortName}</div>
      <img src={Icon} alt="filter-icon" className="filter-icon" />
    </div>
  );
};

export default Sort;
