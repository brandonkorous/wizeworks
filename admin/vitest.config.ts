import { defineConfig } from 'vitest/config';

// Each package under packages/ runs its own tests with its own config (ui needs
// jsdom). From here, run only the app's.
export default defineConfig({
  test: {
    exclude: ['packages/**', '**/node_modules/**', '.next/**'],
  },
});
