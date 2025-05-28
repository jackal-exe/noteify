import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react()],
	build: {
		target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
	},
	server: {
		host: '127.0.0.1',
		port: 3000
	}
});
