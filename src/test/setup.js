import '@testing-library/jest-dom';

// Recharts requires ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
