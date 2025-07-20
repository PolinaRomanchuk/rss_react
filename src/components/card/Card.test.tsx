import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import Card from './Card';

describe('Card component', () => {
  it('render name and description', () => {
    render(<Card name="Test name" description="Test description" />);
    expect(screen.getByText('Test name')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
