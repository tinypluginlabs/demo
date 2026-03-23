import React from 'react';
import type { Extension } from '@codemirror/state';
export type CodeEditorHandle = {
    focus: () => void;
    blur: () => void;
    getCursorPosition: () => number | null;
    setCursorPosition: (pos: number) => void;
};
export type CodeEditorProps = {
    code: string;
    onChange: (next: string) => void;
    currentPath: string | null;
    className?: string;
    onSaveShortcut?: () => void;
    readOnly?: boolean;
    additionalExtensions?: Extension[];
};
export declare const CodeEditor: React.ForwardRefExoticComponent<CodeEditorProps & React.RefAttributes<CodeEditorHandle>>;
