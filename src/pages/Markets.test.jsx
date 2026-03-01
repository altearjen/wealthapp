import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Markets from './Markets';

function renderPage() {
  return render(<MemoryRouter><Markets /></MemoryRouter>);
}

describe('Markets page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Markets')).toBeInTheDocument();
  });

  it('displays market indices', () => {
    renderPage();
    expect(screen.getByText('S&P 500')).toBeInTheDocument();
    expect(screen.getByText('NASDAQ')).toBeInTheDocument();
    expect(screen.getByText('Dow Jones')).toBeInTheDocument();
  });

  it('displays stock symbols in the table', () => {
    renderPage();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('NVDA')).toBeInTheDocument();
  });

  it('filters by search', () => {
    renderPage();
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'NVDA' } });
    expect(screen.getByText('NVDA')).toBeInTheDocument();
    expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
  });

  it('filters by sector tab', () => {
    renderPage();
    const energyTabs = screen.getAllByText('Energy');
    fireEvent.click(energyTabs[0]);
    expect(screen.getByText('XOM')).toBeInTheDocument();
    expect(screen.queryByText('AAPL')).not.toBeInTheDocument();
  });
});
