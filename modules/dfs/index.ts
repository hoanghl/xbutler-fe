// Reexport the native module. On web, it will be resolved to DfsModule.web.ts
// and on native platforms to DfsModule.ts

import DfsModule from "./src/DfsModule";

export * from "./src/Dfs.types";
export { default } from "./src/DfsModule";
