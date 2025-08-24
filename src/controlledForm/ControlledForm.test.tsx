import { render, screen } from '@testing-library/react';
import ControlledForm from './ControlledForm';
import userEvent from '@testing-library/user-event';
import BaseForm from '../baseForm/BaseForm';

describe('ControlledForm', () => {
  const mockSetShowModal = jest.fn();

  it('renders all input fields', () => {
    render(<ControlledForm setShowModal={mockSetShowModal} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Age/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Done/i })).toBeInTheDocument();
  });

  it('updates input values', async () => {
    const user = userEvent.setup();
    render(<ControlledForm setShowModal={mockSetShowModal} />);
    const nameInput = screen.getByLabelText(/Name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Polina');
    expect(nameInput).toHaveValue('Polina');
  });

  it('can submit form without validation', async () => {
    const user = userEvent.setup();
    render(<ControlledForm setShowModal={mockSetShowModal} />);
    const submitButton = screen.getByRole('button', { name: /done/i });
    await user.click(submitButton);

    expect(mockSetShowModal).toHaveBeenCalledTimes(0);
  });

  it('toggles agreement checkbox', async () => {
    const user = userEvent.setup();
    render(<ControlledForm setShowModal={mockSetShowModal} />);

    const checkbox = screen.getByLabelText(/I agree/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);

    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('renders submit button disabled initially', () => {
    render(
      <BaseForm
        handleSubmit={jest.fn()}
        values={{
          name: '',
          age: 0,
          gender: 'male',
          country: '',
          email: '',
          password: '',
          confirmedPassword: '',
          agreement: false,
          file: null,
        }}
        onChange={jest.fn()}
        errors={{}}
        isValid={false}
      />
    );

    const button = screen.getByRole('button', {
      name: /Done/i,
    }) as HTMLButtonElement;
    expect(button).toBeDisabled();
  });
});
