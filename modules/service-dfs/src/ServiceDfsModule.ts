import { NativeModule, requireNativeModule } from 'expo';

import { ServiceDfsModuleEvents } from './ServiceDfs.types';

declare class ServiceDfsModule extends NativeModule<ServiceDfsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ServiceDfsModule>('ServiceDfs');
