import { NativeModule, requireNativeModule } from 'expo';

import { DfsModuleEvents } from './Dfs.types';

declare class DfsModule extends NativeModule<DfsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<DfsModule>('Dfs');
