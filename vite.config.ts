import react from "@vitejs/plugin-react"

import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import { qrcode } from "vite-plugin-qrcode"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
	base: "text-formatter",
	plugins: [
		react(),
		tsconfigPaths(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
			manifest: {
				lang: "ru",
				display: "minimal-ui",
				id: "text-formatter",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
		qrcode(), // only applies in dev mode
	],
	build: {
		chunkSizeWarningLimit: 300,
		minify: "esbuild",
		cssMinify: "esbuild",
		rollupOptions: {},
	},
})
