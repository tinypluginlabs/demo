import type { Emscripten, MountHandler, PHP } from '@php-wasm/universal';
import type { MountDevice } from '@wp-playground/storage';
declare global {
    interface FileSystemFileHandle {
        move(target: FileSystemDirectoryHandle): Promise<void>;
        move(name: string): Promise<void>;
        move(target: FileSystemDirectoryHandle, name: string): Promise<void>;
        createWritable(): Promise<FileSystemWritableFileStream>;
    }
    interface FileSystemWritableFileStream {
        write(buffer: BufferSource, options?: FileSystemReadWriteOptions): Promise<number>;
        close(): Promise<void>;
        seek(offset: number): Promise<void>;
        truncate(newSize: number): Promise<void>;
    }
}
/** @deprecated Import MountDevice from '@wp-playground/storage' instead. */
export type { MountDevice };
export interface MountOptions {
    initialSync: {
        direction?: 'opfs-to-memfs' | 'memfs-to-opfs';
        onProgress?: SyncProgressCallback;
    };
}
export type SyncProgress = {
    /** The number of files that have been synced. */
    files: number;
    /** The number of all files that need to be synced. */
    total: number;
};
export type SyncProgressCallback = (progress: SyncProgress) => void;
export declare function createDirectoryHandleMountHandler(handle: FileSystemDirectoryHandle, options?: MountOptions): MountHandler;
export declare function copyMemfsToOpfs(FS: Emscripten.RootFS, opfsRoot: FileSystemDirectoryHandle, memfsRoot: string, onProgress?: SyncProgressCallback): Promise<void>;
export declare function journalFSEventsToOpfs(php: PHP, opfsRoot: FileSystemDirectoryHandle, memfsRoot: string): () => void;
