import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';

describe('ErrorPage', () => {
  it('renders error page content', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByAltText('0')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist')
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
