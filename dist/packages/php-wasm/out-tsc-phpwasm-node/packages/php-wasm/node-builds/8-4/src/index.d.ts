import type { PHPLoaderModule } from '@php-wasm/universal';
import { jspi } from 'wasm-feature-detect';
export declare function getPHPLoaderModule(): Promise<PHPLoaderModule>;
export declare function getIntlExtensionPath(): Promise<string>;
export declare function getXdebugExtensionPath(): Promise<string>;
export declare function getRedisExtensionPath(): Promise<string>;
export declare function getMemcachedExtensionPath(): Promise<string>;
export { jspi };
