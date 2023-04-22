# Q'n'A

## Vite

### Does Vite allow to set several modes simultaniosly?

No, in short. There is no infrastucture to handle several modes.

$ vite build --mode development --mode https

This way it won't work. The last argument will rewrite the whole value. And what is more important, the wariables from the .env.development won't be read automatically.

$ vite build --mode development,https

Will set mode variable as a `"development,https"` string and every time where you need to use either `mode` or `import.meta.env.MODE` you have to transform into something you are ready work with.

Of course, those issues could be overcomed, if needed
- mode string could be parsed and the envs can be stored within `import.meta.env` as separate variables, use [src/env.d.ts](./src/env.d.ts) and [config.define](https://vitejs.dev/config/shared-options.html#define)
- vite provide [loadEnv](https://vitejs.dev/guide/api-javascript.html#loadenv) helper, to ready easily any env file from within the vite.config.ts module 

### Does Vite perform the typechecking on typescript code?

No, though, that isn't an issue at all. To make sure the code is correct we can call the `tsc --noEmit` beforehand the build.

### Does Vite able to to split big files on chunks automatically?

Maybe, but it doesn't. It shows the warnings and provides seversl strategies to split the codebase on smaller pieces

```
(!) Some chunks are larger than 500 kBs after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

### How to make experimental customisation of env variables on local machine?

Create a file `env/.env.<mode-name>.local` put there the variables you need. They will be merged over the variables from the `.env.<mode-name>`.

For more details and examples check https://vitejs.dev/guide/env-and-mode.html#env-files

