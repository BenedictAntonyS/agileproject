"use strict";
exports.__esModule = true;
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
// https://vitejs.dev/config/
exports["default"] = vite_1.defineConfig({
    plugins: [plugin_react_1["default"]()],
    optimizeDeps: {
        exclude: ["lucide-react"]
    },
    server: {
        proxy: {
            "/api": "http://localhost:5000"
        }
    }
});
