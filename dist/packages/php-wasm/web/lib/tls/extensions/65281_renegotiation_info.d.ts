/**
 * Renegotiation Info Extension (RFC 5746)
 * https://datatracker.ietf.org/doc/html/rfc5746
 *
 * This extension is used to prevent MITM attacks during TLS renegotiation.
 * For initial connections (not renegotiations), the client sends an empty
 * renegotiated_connection field, and the server responds with the same.
 *
 * struct {
 *    opaque renegotiated_connection<0..255>;
 * } RenegotiationInfo;
 */
export type RenegotiationInfo = {
    renegotiatedConnection: Uint8Array;
};
export declare const RenegotiationInfoExtension: {
    decodeFromClient(data: Uint8Array): RenegotiationInfo;
    /**
     * For an initial connection (not a renegotiation), the server responds
     * with an empty renegotiated_connection field.
     */
    encodeForClient(): Uint8Array;
};
