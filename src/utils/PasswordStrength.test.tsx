import { render, screen } from '@testing-library/react';
import PasswordStrength from './PasswordStrength';
import * as utils from './utils';

describe('PasswordStrength', () => {
  it('renders cells', () => {
    jest.spyOn(utils, 'getPasswordStrength').mockReturnValue({
      score: 3,
      color: 'orange',
      label: 'Medium',
    });

    render(<PasswordStrength password="abc123" />);
    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(5);
  });

  it('applies correct colors by score', () => {
    jest.spyOn(utils, 'getPasswordStrength').mockReturnValue({
      score: 3,
      color: 'orange',
      label: 'Medium',
    });

    render(<PasswordStrength password="abc123" />);
    const cells = screen.getAllByTestId('cell');

    cells
      .slice(0, 3)
      .forEach((cell) =>
        expect(cell).toHaveStyle({ backgroundColor: 'rgb(255, 165, 0)' })
      );

    cells
      .slice(3)
      .forEach((cell) =>
        expect(cell).toHaveStyle({ backgroundColor: 'rgb(211, 211, 211)' })
      );
  });

  it('displays label with password strength', () => {
    jest.spyOn(utils, 'getPasswordStrength').mockReturnValue({
      score: 3,
      color: 'orange',
      label: 'Medium',
    });

    render(<PasswordStrength password="abc123" />);
    expect(screen.getByText(/Medium password/i)).toBeInTheDocument();
  });

  it('does not render label if password is empty', () => {
    jest.spyOn(utils, 'getPasswordStrength').mockReturnValue({
      score: 0,
      color: 'lightgray',
      label: 'Weak',
    });

    render(<PasswordStrength password="" />);
    expect(screen.queryByText(/password/i)).not.toBeInTheDocument();
  });
});
