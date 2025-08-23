import type { ReactElement, ReactNode } from 'react';
import './modal.css';

type ModalProps = {
  setShowModal: (value: boolean) => void;
  children: ReactNode;
};

const Modal = ({ setShowModal, children }: ModalProps): ReactElement => {
  const handleClose = (): void => {
    setShowModal(false);
  };
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  });

  return (
    <>
      <div className="modal_overlay" onClick={handleClose}>
        <div
          className="modal_container"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="modal_close-button" onClick={handleClose}>
            x
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
