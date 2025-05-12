// This is the configuration file for Vite.
// It uses the React plugin to enable React-specific features.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
