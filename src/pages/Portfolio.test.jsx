import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Portfolio from './Portfolio';

function renderPage() {
  return render(<MemoryRouter><Portfolio /></MemoryRouter>);
}

describe('Portfolio page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('displays account cards', () => {
    renderPage();
    expect(screen.getByText('Individual Brokerage')).toBeInTheDocument();
  });
});
