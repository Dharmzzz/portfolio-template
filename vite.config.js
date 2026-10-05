import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * 
 * - react(): Enables Fast Refresh and JSX transformation for React components.
 * - server.host: Set to true to allow access over local network / tunneling (ngrok, cloudflare).
 * - server.allowedHosts: Pre-configured wildcard list to prevent host-blocking errors during tunnel testing.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok.app',
      '.ngrok.io',
      '.loca.lt',
      'localhost',
      '127.0.0.1'
    ],
  },
});
