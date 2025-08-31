import { type ReactElement } from 'react';
import './modal.css';

type ModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  columns: string[];
  selectedColumns: string[];
  setSelectedColumns: (cols: string[]) => void;
};

const Modal = ({
  show,
  setShow,
  columns,
  selectedColumns,
  setSelectedColumns,
}: ModalProps): ReactElement | null => {
  if (!show) return null;

  const toggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== col));
    } else {
      setSelectedColumns([...selectedColumns, col]);
    }
  };

  const handleClose = (): void => {
    setShow(false);
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  });

  return (
    <div className="modal_overlay" onClick={handleClose}>
      <div
        className="modal_container"
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={handleClose} className="modal_close-button">
          x
        </button>
        <ul>
          {columns.map((col) => (
            <li key={col}>
              <input
                type="checkbox"
                id={`checkbox-${col}`}
                checked={selectedColumns.includes(col)}
                onChange={() => toggleColumn(col)}
              />
              <label htmlFor={`checkbox-${col}`}>{col}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
