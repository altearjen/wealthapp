import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Holdings from './Holdings';

function renderPage() {
  return render(<MemoryRouter><Holdings /></MemoryRouter>);
}

describe('Holdings page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Holdings')).toBeInTheDocument();
  });

  it('displays stock symbols', () => {
    renderPage();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
  });

  it('filters holdings by search', () => {
    renderPage();
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'Apple' } });
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.queryByText('MSFT')).not.toBeInTheDocument();
  });

  it('filters holdings by sector', () => {
    const { container } = renderPage();
    const allRows = screen.getAllByRole('row');
    // Click the Energy filter tab (inside .filter-tabs)
    const filterTab = container.querySelector('.filter-tabs');
    const energyTab = [...filterTab.children].find(el => el.textContent === 'Energy');
    fireEvent.click(energyTab);
    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBeLessThan(allRows.length);
    expect(screen.getByText('XOM')).toBeInTheDocument();
  });
});
