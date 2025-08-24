import { render, screen } from '@testing-library/react';
import { act } from 'react';
import DataList from './DataList';
import { useStore } from '../store/store';

jest.mock('../store/store');
jest.mock('../assets/default.jpeg', () => 'default-image.jpg');

describe('DataList', () => {
  const mockUseStore = useStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it('renders empty container if no data', () => {
    mockUseStore.mockReturnValue([]);
    render(<DataList />);
    expect(screen.getByTestId('data-list')).toBeInTheDocument();
  });

  it('renders data items', () => {
    const testData = [
      {
        name: 'Polina',
        age: 26,
        email: 'polina@example.com',
        gender: 'female',
        country: 'Belarus',
        file: 'polina.jpg',
      },
      {
        name: 'Test',
        age: 30,
        email: 'test@example.com',
        gender: 'male',
        country: 'USA',
        file: '',
      },
    ];

    mockUseStore.mockReturnValue(testData);
    render(<DataList />);

    expect(screen.getByText('Name: Polina')).toBeInTheDocument();
    expect(screen.getByText('Age: 26')).toBeInTheDocument();
    expect(screen.getByText('Name: Test')).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'polina.jpg');
    expect(images[1]).toHaveAttribute('src', 'default-image.jpg');
  });

  it('highlights new element', () => {
    const testData = [
      {
        name: 'Polina',
        age: 26,
        email: 'polina@example.com',
        gender: 'female',
        country: 'Belarus',
        file: 'polina.jpg',
      },
    ];
    mockUseStore.mockReturnValue(testData);

    render(<DataList />);

    const item = screen.getByText(/Name: Polina/i).closest('div');
    expect(item).toHaveClass('new');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(item).not.toHaveClass('new');
  });
});
