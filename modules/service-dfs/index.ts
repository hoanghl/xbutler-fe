// Reexport the native module. On web, it will be resolved to ServiceDfsModule.web.ts
// and on native platforms to ServiceDfsModule.ts
export * from "./src/ServiceDfs.types";
export { default } from "./src/ServiceDfsModule";
