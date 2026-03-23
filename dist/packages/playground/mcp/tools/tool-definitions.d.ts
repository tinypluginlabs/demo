/**
 * Tool metadata and schema helpers for WordPress Playground.
 *
 * Pure data — no execution logic. Both the MCP server and
 * WebMCP import these for consistent descriptions, annotations,
 * and schema conversion.
 */
export interface ToolAnnotations {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
    idempotentHint?: boolean;
    openWorldHint?: boolean;
}
export type ToolParamType = 'string' | 'boolean' | 'object';
export interface ToolParam {
    name: string;
    type: ToolParamType;
    description: string;
    required: boolean;
    additionalProperties?: boolean;
    default?: unknown;
}
export interface ToolDefinition {
    title: string;
    description: string;
    errorPrefix: string;
    annotations: ToolAnnotations;
    params: ToolParam[];
}
export declare function playgroundUrl(port: number): string;
export declare const toolDefinitions: Record<string, ToolDefinition>;
export declare function getSiteToolDefinitions(): Record<string, ToolDefinition>;
export declare function stringifyError(error: unknown): string;
/**
 * Translate internal Playground storage types to user-facing names.
 */
export declare function presentStorage(raw: string): string;
/**
 * Convert ToolParam[] to a plain JSON Schema object.
 * Used by WebMCP which expects raw JSON Schema (not Zod).
 */
export declare function paramsToJsonSchema(params: ToolParam[]): Record<string, unknown>;
