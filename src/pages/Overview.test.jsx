import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Overview from './Overview';

function renderPage() {
  return render(<MemoryRouter><Overview /></MemoryRouter>);
}

describe('Overview page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('displays portfolio total value', () => {
    renderPage();
    expect(screen.getByText('Total Portfolio Value')).toBeInTheDocument();
  });

  it('displays portfolio value chart section', () => {
    renderPage();
    expect(screen.getByText('Portfolio Value')).toBeInTheDocument();
  });
});
