import path from "path";
import { RollupOptions } from "rollup";
import { UserConfig, CSSOptions, ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Docs: https://vitejs.dev/
 * Make sure to check https://github.com/vitejs/awesome-vite for cool stuff
 */
export default defineConfig(
  async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
    console.log("Mode: ", mode);
    console.log("Command: ", command);

    const rollupOptions: RollupOptions = {
      input: {
        main: path.resolve(__dirname, "src", "index.html"),
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          agGrid: ["ag-grid-react"],
        },
      },
    };

    const css: CSSOptions = {
      preprocessorOptions: {
        scss: {
          sourceMapEmbed: true,
        },
      },
    };
    const config: UserConfig = {
      root: path.join(process.cwd(), "src"),
      envDir: path.resolve(__dirname, "env"),
      build: {
        outDir: path.join(process.cwd(), "dist"),
        emptyOutDir: true, // clean up the previously built assets before the next build
        minify: "terser",
        terserOptions: {},
        cssMinify: true,
        sourcemap: true,
        rollupOptions: rollupOptions,
        modulePreload: {
          // known issue of loading the chunks twice in firefox
          // https://github.com/vitejs/vite/issues/5532
          polyfill: false,
        },
      },
      server: {
        port: 3000,
        https: false,
        origin: "http://localhost:3000",
        watch: {
          interval: 1000,
        },
      },
      preview: {
        port: 3001,
        https: false,
      },
      plugins: [react()],
    };

    return Promise.resolve(config);
  }
);
