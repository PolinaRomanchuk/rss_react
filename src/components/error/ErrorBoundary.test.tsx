import { render, screen } from '@testing-library/react';

import ErrorBoundary from '../error/ErrorBoundary';
import { expect, vi } from 'vitest';

function ErrorComponent() {
  throw new Error('Test error');
  return <></>;
}

function NormalComponent() {
  return <div>normal component</div>;
}

describe('ErrorBoundary', () => {
  it('render children when no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/normal component/i)).toBeInTheDocument();
  });

  it('show error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
