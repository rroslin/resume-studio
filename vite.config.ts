import path from 'path'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
	plugins: [solid()],
	build: {
		assetsInlineLimit: 0
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src/')
		}
	}
})
