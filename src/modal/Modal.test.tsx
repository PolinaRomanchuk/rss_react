import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import type { ReactNode } from 'react';

describe('Modal', () => {
  const mockSetShowModal = jest.fn();

  const renderModal = (children: ReactNode = <div>Modal Content</div>) =>
    render(<Modal setShowModal={mockSetShowModal}>{children}</Modal>);

  beforeEach(() => {
    mockSetShowModal.mockClear();
  });

  it('renders children', () => {
    renderModal();
    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
  });

  it('closes modal on overlay click', async () => {
    const user = userEvent.setup();
    renderModal();
    const overlay =
      screen.getByText(/Modal Content/i).parentElement?.parentElement;
    if (!overlay) throw new Error('Overlay not found');

    await user.click(overlay);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });

  it('closes modal on close button click', async () => {
    renderModal();
    const closeBtn = screen.getByText('x');
    await userEvent.click(closeBtn);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });

  it('closes modal on Escape', async () => {
    const user = userEvent.setup();
    renderModal();
    await user.keyboard('{Escape}');
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });
});
