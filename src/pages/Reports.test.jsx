import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Reports from './Reports';

function renderPage() {
  return render(<MemoryRouter><Reports /></MemoryRouter>);
}

describe('Reports page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('displays report items', () => {
    renderPage();
    expect(screen.getByText('Annual Performance Report 2024')).toBeInTheDocument();
    expect(screen.getByText('Q4 2024 Portfolio Summary')).toBeInTheDocument();
  });
});
