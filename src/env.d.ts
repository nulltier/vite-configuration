/// <reference types="vite/client" />

/**
 * Important to get editor support on import.meta.env variable
 * https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript
 */

interface ImportMetaEnv {
  readonly VITE_RUNTIME_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
