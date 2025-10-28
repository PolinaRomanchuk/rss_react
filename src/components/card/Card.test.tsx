import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import Card from './Card';

describe('Card component', () => {
  it('renders name and description', () => {
    render(
      <Card
        name="Test name"
        image="Test image"
        onClick={() => {}}
        isChecked={false}
        onToggleCheckbox={() => {}}
        q
      />
    );
    expect(screen.getByText('Test name')).toBeInTheDocument();
  });
});
