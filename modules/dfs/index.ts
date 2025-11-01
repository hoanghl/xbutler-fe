// Reexport the native module. On web, it will be resolved to DfsModule.web.ts
// and on native platforms to DfsModule.ts
export { default } from './src/DfsModule';
export { default as DfsView } from './src/DfsView';
export * from  './src/Dfs.types';
