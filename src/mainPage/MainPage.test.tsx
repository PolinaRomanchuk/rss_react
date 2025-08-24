import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';
import * as ReactDOM from 'react-dom';
import userEvent from '@testing-library/user-event';
import type { ReactNode, ReactPortal } from 'react';

jest.mock('react-dom', () => {
  const actual = jest.requireActual<typeof ReactDOM>('react-dom');
  return {
    ...actual,
    createPortal: (
      node: ReactNode,
      _container: Element | DocumentFragment
    ): ReactPortal => node as unknown as ReactPortal,
  };
});

describe('MainPage', () => {
  it('renders buttons and DataList', () => {
    render(<MainPage />);
    expect(screen.getByTestId('btn-controlled')).toBeInTheDocument();
    expect(screen.getByTestId('btn-uncontrolled')).toBeInTheDocument();
    expect(screen.queryByRole('modal')).not.toBeInTheDocument();
  });

  it('opens UncontrolledForm by click', async () => {
    const user = userEvent.setup();
    render(<MainPage />);
    await user.click(screen.getByTestId('btn-uncontrolled'));
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
  });

  it('opens ControlledForm by click', async () => {
    const user = userEvent.setup();

    render(<MainPage />);
    await user.click(screen.getByTestId('btn-controlled'));
    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
  });

  it('closes modal window', async () => {
    const user = userEvent.setup();
    render(<MainPage />);
    await user.click(screen.getByTestId('btn-uncontrolled'));
    const closeBtn = screen.getByRole('button', { name: /x/i });
    await user.click(closeBtn);
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });
});
