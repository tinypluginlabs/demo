import React from 'react';
import type { AsyncWritableFilesystem } from '../../../storage/src/index.ts';
declare global {
    interface Window {
        __filePickerHarness?: {
            filesystem: AsyncWritableFilesystem;
            reload: () => void;
            lastSelectedPath: string | null;
            lastDoubleClickedPath: string | null;
        };
    }
}
export declare function FilePickerTreeHarness(): React.JSX.Element;
