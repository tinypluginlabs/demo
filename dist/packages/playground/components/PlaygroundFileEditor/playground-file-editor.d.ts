import React from 'react';
import type { AsyncWritableFilesystem } from '../../../storage/src/index.ts';
export type PlaygroundFileEditorProps = {
    filesystem: AsyncWritableFilesystem | null;
    isVisible?: boolean;
    documentRoot: string;
    initialPath?: string | null;
    placeholderText?: string;
    onSaveFile?: (path: string, content: string) => Promise<void>;
    /**
     * Called before the filesystem changes, allowing the parent to flush
     * any pending saves to the old filesystem.
     */
    onBeforeFilesystemChange?: (oldFilesystem: AsyncWritableFilesystem) => Promise<void>;
};
/**
 * A reusable file browser component with a file tree on the left and
 * a code editor on the right. Supports auto-save with debouncing,
 * cursor position preservation, and binary file handling.
 */
export declare function PlaygroundFileEditor({ filesystem, isVisible, documentRoot, initialPath, placeholderText, onSaveFile, onBeforeFilesystemChange, }: PlaygroundFileEditorProps): React.JSX.Element;
