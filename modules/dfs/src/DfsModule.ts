import { NativeModule, requireNativeModule } from "expo";

import { DfsModuleEvents } from "./Dfs.types";

declare class DfsModule extends NativeModule<DfsModuleEvents> {
  PI: number;
  stopDFS(): void;
  startDFS(rawIpDNS: number[]): void;
  getDFSStatus(): number;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<DfsModule>("Dfs");
