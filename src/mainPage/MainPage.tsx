import { useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../modal/Modal';
import UncontrolledForm from '../uncontrolledForm/UncontrolledForm';
import ControlledForm from '../controlledForm/ControlledForm';
import DataList from '../dataList/DataList';

const MainPage = (): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<
    'uncontrolled-form' | 'controlled-form' | null
  >(null);

  const openModal = (type: 'uncontrolled-form' | 'controlled-form'): void => {
    setModalContent(type);
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={() => openModal('uncontrolled-form')}
        data-testid="btn-uncontrolled"
      >
        Uncontrolled form
      </button>
      <button
        onClick={() => openModal('controlled-form')}
        data-testid="btn-controlled"
      >
        Controlled form
      </button>
      <DataList />

      {showModal &&
        createPortal(
          <Modal setShowModal={setShowModal}>
            {modalContent === 'uncontrolled-form' ? (
              <UncontrolledForm setShowModal={setShowModal} />
            ) : (
              <ControlledForm setShowModal={setShowModal} />
            )}
          </Modal>,
          document.documentElement
        )}
    </>
  );
};

export default MainPage;
