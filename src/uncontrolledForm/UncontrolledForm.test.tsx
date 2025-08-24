import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from './UncontrolledForm';
import * as utils from '../utils/utils';

jest.mock('../utils/utils', () => ({
  getbase64: jest.fn(),
}));

jest.mock('../utils/AutocompletedCountry', () =>
  jest.fn(() => <div>Mocked Autocomplete</div>)
);

jest.mock('../utils/PasswordStrength', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Password Strength</div>),
}));

describe('UncontrolledForm', () => {
  const mockSetShowModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (utils.getbase64 as jest.Mock).mockResolvedValue('mock-base64');
  });

  it('renders all input fields', () => {
    render(<UncontrolledForm setShowModal={mockSetShowModal} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Age/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Done/i })).toBeInTheDocument();
  });

  it('toggles agreement checkbox', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm setShowModal={mockSetShowModal} />);

    const checkbox = screen.getByLabelText(/I agree/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);

    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('allows file selection', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm setShowModal={mockSetShowModal} />);

    const fileInput = screen.getByLabelText(
      /Upload image/i
    ) as HTMLInputElement;
    const file = new File(['dummy content'], 'file.png', { type: 'image/png' });

    await user.upload(fileInput, file);

    expect(fileInput.files?.[0]).toStrictEqual(file);
    expect(fileInput.files?.length).toBe(1);
  });

  it('checks submit button', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm setShowModal={mockSetShowModal} />);

    const submitButton = screen.getByRole('button', { name: /Done/i });
    await user.click(submitButton);

    expect(mockSetShowModal).toHaveBeenCalledTimes(0);
  });
});
