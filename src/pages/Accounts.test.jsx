import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Accounts from './Accounts';

function renderPage() {
  return render(<MemoryRouter><Accounts /></MemoryRouter>);
}

describe('Accounts page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Accounts')).toBeInTheDocument();
  });

  it('displays account names', () => {
    renderPage();
    expect(screen.getAllByText('Individual Brokerage').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Traditional IRA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Roth IRA').length).toBeGreaterThan(0);
  });

  it('displays link account button', () => {
    renderPage();
    expect(screen.getByText('+ Link Account')).toBeInTheDocument();
  });
});
