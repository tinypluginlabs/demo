export declare const MAX_INLINE_FILE_BYTES: number;
/**
 * Checks if a buffer seems to contain binary data by looking for null bytes
 * in the first 4096 bytes and attempting to decode as UTF-8.
 */
export declare const seemsLikeBinary: (buffer: Uint8Array) => boolean;
/**
 * Creates a download URL for a file and returns both the URL and filename.
 * The URL is automatically revoked after 60 seconds.
 */
export declare const createDownloadUrl: (data: Uint8Array, filename: string) => {
    url: string;
    filename: string;
};
/**
 * Gets the MIME type for a filename based on its extension.
 */
export declare const getMimeType: (filename: string) => string;
/**
 * Checks if a MIME type represents a binary file that can be previewed
 * (images, videos, audio).
 */
export declare const isPreviewableBinary: (mimeType: string) => boolean;
