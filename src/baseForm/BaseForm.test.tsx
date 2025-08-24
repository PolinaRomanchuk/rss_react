import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BaseForm from './BaseForm';
import * as utils from '../utils/utils';
import type { FormData } from '../type/form';

jest.mock('../utils/utils');
jest.mock('../utils/AutocompletedCountry', () =>
  jest.fn(() => <div>Mocked Autocomplete</div>)
);
jest.mock('../utils/PasswordStrength', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Password Strength</div>),
}));

describe('BaseForm', () => {
  const mockHandleSubmit = jest.fn();
  const mockOnChange = jest.fn();

  const defaultValues: FormData = {
    name: '',
    age: 0,
    gender: 'male',
    country: '',
    email: '',
    password: '',
    confirmedPassword: '',
    agreement: false,
    file: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (utils.getbase64 as jest.Mock).mockResolvedValue('mock-base64');
  });

  it('uploads file and calls onChange with base64', async () => {
    const user = userEvent.setup();
    render(
      <BaseForm
        handleSubmit={mockHandleSubmit}
        values={defaultValues}
        onChange={mockOnChange}
        errors={{}}
        isValid={false}
      />
    );

    const fileInput = screen.getByLabelText(
      /Upload image/i
    ) as HTMLInputElement;
    const file = new File(['file content'], 'file.png', { type: 'image/png' });

    await user.upload(fileInput, file);

    expect(utils.getbase64).toHaveBeenCalledWith(file);
    expect(mockOnChange).toHaveBeenCalledWith('file', 'mock-base64');
  });

  it('disables submit button when isValid is false', () => {
    render(
      <BaseForm
        handleSubmit={mockHandleSubmit}
        values={defaultValues}
        onChange={mockOnChange}
        errors={{}}
        isValid={false}
      />
    );

    expect(screen.getByRole('button', { name: /Done/i })).toBeDisabled();
  });

  it('calls handleSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    render(
      <BaseForm
        handleSubmit={mockHandleSubmit}
        values={defaultValues}
        onChange={mockOnChange}
        errors={{}}
        isValid={true}
      />
    );

    await user.click(screen.getByRole('button', { name: /Done/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
