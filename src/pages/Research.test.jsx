import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Research from './Research';

function renderPage() {
  return render(<MemoryRouter><Research /></MemoryRouter>);
}

describe('Research page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Research')).toBeInTheDocument();
  });

  it('displays analyst ratings', () => {
    renderPage();
    expect(screen.getByText('NVDA')).toBeInTheDocument();
    expect(screen.getByText('Goldman Sachs')).toBeInTheDocument();
  });

  it('displays news section', () => {
    renderPage();
    expect(screen.getByText(/Fed holds rates steady/)).toBeInTheDocument();
  });
});
