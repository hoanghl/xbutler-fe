import { NativeModule, requireNativeModule } from "expo";

import { DfsModuleEvents } from "./Dfs.types";

declare class DfsModule extends NativeModule<DfsModuleEvents> {
  stopDFS(): void;
  startDFS(rawIpDNS: String, portDNS: number, portReceiver: number): void;
  getDFSStatus(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<DfsModule>("Dfs");
