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

const DEVELOPMENT_MODE = "development";
const PRODUCTION_MODE = "production";
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
          day: ["./src/styles/themes/day.scss"],
          night: ["./src/styles/themes/night.scss"],
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
      modulePreload: {
        // known issue of loading the chunks twice in firefox
        // https://github.com/vitejs/vite/issues/5532
        polyfill: false,
      },
    };

    const serverOptions: ServerOptions = {
      port: 3000,
      https: false,
      origin: "http://localhost:3000",
      watch: {
        interval: 1000,
      },
    };

    const previewOptions: PreviewOptions = {
      port: 3001,
      https: false,
    };

    const pluginsList: PluginOption[] = [
      eslint({
        failOnError: true,
        emitWarning: true,
      }),
      react(),
    ];

    return Promise.resolve({
      root: path.join(process.cwd(), "src"),
      envDir: path.resolve(__dirname, "env"),
      css: cssOptions,
      build: buildOptions,
      server: serverOptions,
      preview: previewOptions,
      plugins: pluginsList,
    });
  }
);
