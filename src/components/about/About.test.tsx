import { render, screen } from '@testing-library/react';
import About from './About';
import { expect } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('About component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  });

  it('render photo and name', () => {
    const photo = screen.getByAltText(/photo/i);
    expect(photo).toBeInTheDocument();

    const name = screen.getByText(/Polina Romanchuk/i);
    expect(name).toBeInTheDocument();
  });

  it('render RSS link', () => {
    const rssLink = screen.getByRole('link', { name: /RS School website/i });
    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(rssLink).toHaveAttribute('target', '_blank');
    expect(rssLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('render contact icons with links', () => {
    const mailLink = screen.getByRole('link', { name: /mail/i });
    expect(mailLink).toHaveAttribute(
      'href',
      'mailto:polina.romanchuk99@mail.ru'
    );
    expect(mailLink).not.toHaveAttribute('target');
    expect(mailLink).toHaveAttribute('rel', 'noreferrer');

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/PolinaRomanchuk'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/polina-romanchuk-2b2543286/'
    );
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer');
  });
});
