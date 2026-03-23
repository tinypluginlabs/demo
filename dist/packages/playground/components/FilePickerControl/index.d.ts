import React from 'react';
import type { AsyncWritableFilesystem } from '../../../storage/src/index.ts';
export declare function FilePickerControl({ value, onChange, filesystem, }: {
    value?: string;
    onChange: (selectedPath: string) => void;
    filesystem: AsyncWritableFilesystem;
}): React.JSX.Element;
