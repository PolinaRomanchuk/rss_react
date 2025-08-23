import { useEffect, useState, type ReactElement } from 'react';
import { useStore } from '../store/store';
import './data.css';
import DefaultImage from '../../public/default.jpeg';

const DataList = (): ReactElement => {
  const data = useStore((state) => state.formDataList);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const newIndex = data.length - 1;
      setHighlightIndex(newIndex);

      const timer = setTimeout(() => setHighlightIndex(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div className="data_container">
      {data &&
        data.map((form, index) => (
          <div
            key={index}
            className={`data_content ${highlightIndex === index ? 'new' : ''}`}
          >
            <h3>{index + 1}</h3>
            <img
              src={form.file || DefaultImage}
              alt="img"
              className="data_image"
            />
            <p>Name: {form.name}</p>
            <p>Age: {form.age}</p>
            <p>Email: {form.email}</p>
            <p>Gender: {form.gender}</p>
            <p>Country: {form.country}</p>
          </div>
        ))}
    </div>
  );
};
export default DataList;
