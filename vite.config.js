import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
	plugins: [react()],
	server: {
		port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
		host: "0.0.0.0", // Ensure the server binds to 0.0.0.0
	},
});
