import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Transactions from './Transactions';

function renderPage() {
  return render(<MemoryRouter><Transactions /></MemoryRouter>);
}

describe('Transactions page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  it('displays transaction type filter tabs', () => {
    renderPage();
    expect(screen.getAllByText('Buy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sell').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dividend').length).toBeGreaterThan(0);
  });

  it('displays transaction summary cards', () => {
    renderPage();
    expect(screen.getByText('Total Buys')).toBeInTheDocument();
    expect(screen.getByText('Total Sells')).toBeInTheDocument();
  });
});
