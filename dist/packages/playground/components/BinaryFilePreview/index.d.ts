import React from 'react';
export type BinaryFilePreviewProps = {
    filename: string;
    mimeType: string;
    dataUrl: string;
    downloadUrl?: string | null;
    showHeader?: boolean;
};
export declare function BinaryFilePreview({ filename, mimeType, dataUrl, downloadUrl, showHeader, }: BinaryFilePreviewProps): React.JSX.Element;
