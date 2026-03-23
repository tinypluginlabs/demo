export declare function generateCertificate(): Promise<{
    cert: string;
    key: string;
    certPath: string;
}>;
export declare function cleanupCertificate(): void;
