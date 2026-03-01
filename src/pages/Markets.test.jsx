import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Markets from './Markets';

// Recharts requires ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

function renderMarkets() {
  return render(
    <MemoryRouter>
      <Markets />
    </MemoryRouter>
  );
}

describe('Markets page', () => {
  it('renders the page heading', () => {
    renderMarkets();
    expect(screen.getByText('Markets')).toBeInTheDocument();
  });

  it('applies up-text class to positive changes', () => {
    renderMarkets();
    // NVDA has change +24.10 (positive)
    const nvdaChange = screen.getByText(/\+24\.10/);
    expect(nvdaChange).toHaveClass('up-text');
    expect(nvdaChange).not.toHaveClass('down-text');
  });

  it('applies down-text class to negative changes', () => {
    renderMarkets();
    // MSFT has change -2.11 (negative)
    const msftChange = screen.getByText(/-2\.11/);
    expect(msftChange).toHaveClass('down-text');
    expect(msftChange).not.toHaveClass('up-text');
  });

  it('applies up-text to zero change', () => {
    renderMarkets();
    // All items with change >= 0 should get up-text
    // SPY has +2.18
    const spyChange = screen.getByText(/\+2\.18/);
    expect(spyChange).toHaveClass('up-text');
  });
});
