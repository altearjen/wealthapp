import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Performance from './Performance';

function renderPage() {
  return render(<MemoryRouter><Performance /></MemoryRouter>);
}

describe('Performance page', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByText('Performance')).toBeInTheDocument();
  });

  it('displays cumulative growth section', () => {
    renderPage();
    expect(screen.getByText(/Cumulative Growth/i)).toBeInTheDocument();
  });
});
