// setup.ts
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Import the necessary extensions for Vitest
import '@testing-library/jest-dom/vitest';

// Cleanup after each test to ensure a clean state
afterEach(() => {
  cleanup();
});
