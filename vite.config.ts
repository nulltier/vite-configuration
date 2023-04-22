import path from "path";
import { RollupOptions } from "rollup";
import {
  UserConfig,
  CSSOptions,
  ConfigEnv,
  defineConfig,
  BuildOptions,
  PreviewOptions,
  PluginOption,
  ServerOptions,
} from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import basicSsl from "@vitejs/plugin-basic-ssl";
import legacy from "@vitejs/plugin-legacy";

const DEVELOPMENT_MODE = "development";
/**
 * Docs: https://vitejs.dev/
 * Make sure to check https://github.com/vitejs/awesome-vite for cool stuff
 */
export default defineConfig(
  async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
    const HTTPS = process.env.HTTPS === "true";
    const HOST = HTTPS ? "127.0.0.1" : "localhost";

    const rollupOptions: RollupOptions = {
      input: {
        main: path.resolve(__dirname, "src", "index.html"),
        day: path.resolve(__dirname, "src", "styles", "themes", "day.scss"),
        night: path.resolve(__dirname, "src", "styles", "themes", "night.scss"),
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          agGrid: ["ag-grid-react"],
        },
        // rollup adds hash version id to a filename of each artefact, we need to disable it due the deployment configuration
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    };

    const cssOptions: CSSOptions = {
      preprocessorOptions: {
        scss: {
          sourceMapEmbed: true,
        },
      },
    };

    const buildOptions: BuildOptions = {
      outDir: path.join(process.cwd(), "dist"),
      emptyOutDir: true, // clean up the previously built assets before the next build
      minify: "terser",
      terserOptions: {},
      cssMinify: true,
      sourcemap: mode === DEVELOPMENT_MODE ? "inline" : false,
      rollupOptions: rollupOptions,
    };

    const serverOptions: ServerOptions = {
      port: 3000,
      https: HTTPS,
      host: HOST,
      watch: {
        interval: 1000,
      },
    };

    const previewOptions: PreviewOptions = {
      port: 3001,
      host: HOST,
      https: HTTPS,
    };

    const pluginsList: PluginOption[] = [
      eslint({
        failOnError: true,
        emitWarning: true,
      }),
      react(),
      legacy({
        targets: "last 10 versions, not dead",
      }),
    ];

    if (HTTPS) {
      pluginsList.push(basicSsl());
    }

    return Promise.resolve({
      root: path.join(process.cwd(), "src"),
      envDir: path.resolve(__dirname, "env"),
      css: cssOptions,
      build: buildOptions,
      server: serverOptions,
      preview: previewOptions,
      plugins: pluginsList,
      define: {
        VITE_USER_DYNAMIC: Math.random() > 0.5,
      },
    });
  }
);
