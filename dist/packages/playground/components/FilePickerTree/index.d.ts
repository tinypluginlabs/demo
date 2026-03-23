import type { AsyncWritableFilesystem } from '../../../storage/src/index.ts';
import React from 'react';
export type FileNode = {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
};
export type FilePickerTreeProps = {
    withContextMenu?: boolean;
    filesystem: AsyncWritableFilesystem;
    root?: string;
    initialSelectedPath?: string;
    onSelect?: (path: string | null) => void;
    onDoubleClickFile?: (path: string) => void;
};
export type FilePickerTreeHandle = {
    focusPath: (path: string, options?: {
        select?: boolean;
        domFocus?: boolean;
        notify?: boolean;
    }) => void;
    selectPath: (path: string) => void;
    getSelectedPath: () => string | null;
    expandToPath: (path: string) => Promise<void>;
    refresh: (path: string) => Promise<FileNode[] | undefined>;
    remapPath: (from: string, to: string) => void;
    createFile: (absSelectedPath?: string) => Promise<void>;
    createFolder: (absSelectedPath?: string) => Promise<void>;
};
export declare const FilePickerTree: React.ForwardRefExoticComponent<FilePickerTreeProps & React.RefAttributes<FilePickerTreeHandle>>;
export default FilePickerTree;
