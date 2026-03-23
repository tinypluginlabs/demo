import React, { type Dispatch, type SetStateAction } from 'react';
import type { AsyncWritableFilesystem } from '../../../storage/src/index.ts';
export type FileExplorerSidebarProps = {
    filesystem: AsyncWritableFilesystem;
    currentPath: string | null;
    selectedDirPath: string | null;
    setSelectedDirPath: Dispatch<SetStateAction<string | null>>;
    onFileOpened: (path: string, content: string, shouldFocus?: boolean) => Promise<void> | void;
    onSelectionCleared: () => Promise<void> | void;
    onShowMessage: (path: string | null, message: string | JSX.Element) => Promise<void> | void;
    documentRoot: string;
};
export declare function FileExplorerSidebar({ filesystem, currentPath, selectedDirPath, setSelectedDirPath, onFileOpened, onSelectionCleared, onShowMessage, documentRoot, }: FileExplorerSidebarProps): React.JSX.Element;
