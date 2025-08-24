import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutocompletedCountry from './AutocompletedCountry';
import { useStore } from '../store/store';

jest.mock('../store/store');

const mockCountries = ['Belarus', 'Russia', 'USA', 'Poland'];

describe('AutocompletedCountry', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue(mockCountries);
  });

  it('renders with controlled props', () => {
    const mockSetCountry = jest.fn();
    const mockValidate = jest.fn();
    render(
      <AutocompletedCountry
        country=""
        setCountry={mockSetCountry}
        validateField={mockValidate}
      />
    );
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it('renders with uncontrolled props', () => {
    render(<AutocompletedCountry defaultValue="Belarus" />);
    const input = screen.getByLabelText(/Country/i) as HTMLInputElement;
    expect(input.value).toBe('Belarus');
  });

  it('filters countries', async () => {
    const mockSetCountry = jest.fn();
    const mockValidate = jest.fn();
    render(
      <AutocompletedCountry
        country=""
        setCountry={mockSetCountry}
        validateField={mockValidate}
      />
    );
    const input = screen.getByLabelText(/Country/i);
    await userEvent.type(input, 'us');

    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.queryByText('Poland')).not.toBeInTheDocument();
  });

  it('sets country and validates', async () => {
    const mockSetCountry = jest.fn();
    const mockValidate = jest.fn();
    render(
      <AutocompletedCountry
        country=""
        setCountry={mockSetCountry}
        validateField={mockValidate}
      />
    );
    const input = screen.getByLabelText(/Country/i);
    await userEvent.type(input, 'us');

    const option = screen.getByText('USA');
    await userEvent.click(option);

    expect(mockSetCountry).toHaveBeenCalledWith('USA');
    expect(mockValidate).toHaveBeenCalledWith('country', 'USA');
    expect(screen.queryByText('USA')).not.toBeInTheDocument();
  });
});
