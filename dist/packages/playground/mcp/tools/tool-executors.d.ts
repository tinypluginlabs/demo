/**
 * Shared tool executor functions.
 *
 * Both the MCP server and WebMCP call these executors so that tool
 * output shapes are defined in exactly one place.  Each transport
 * provides its own ToolClient implementation that normalises I/O
 * differences (e.g. byte decoding).
 */
import type { PlaygroundClient } from '@wp-playground/remote';
/**
 * Minimal client interface consumed by tool executors.
 *
 * - WebMCP implements this by wrapping PlaygroundClient (decoding
 *   response bytes via TextDecoder).
 * - The MCP server implements this by wrapping bridge.sendCommand
 *   (bytes are already decoded at the bridge-client boundary).
 */
export interface ToolClient {
    run(options: {
        code: string;
    }): Promise<{
        text: string;
        errors: string;
        exitCode: number;
    }>;
    request(options: {
        url: string;
        method: string;
        headers?: Record<string, string>;
        body?: string;
    }): Promise<{
        text: string;
        httpStatusCode: number;
        headers: Record<string, string[]>;
    }>;
    goTo(path: string): Promise<void>;
    getCurrentURL(): Promise<string>;
    readFileAsText(path: string): Promise<string>;
    writeFile(path: string, contents: string): Promise<void>;
    listFiles(path: string): Promise<string[]>;
    mkdirTree(path: string): Promise<void>;
    unlink(path: string): Promise<void>;
    rmdir(path: string, options: {
        recursive: boolean;
    }): Promise<void>;
    fileExists(path: string): Promise<boolean>;
}
export interface SiteInfo {
    url: string;
    documentRoot: string;
    siteUrl: string;
    wpVersion: string;
    phpVersion: string;
}
export declare const toolExecutors: Record<string, (client: ToolClient, input: Record<string, unknown>) => Promise<unknown>>;
/**
 * Wrap a PlaygroundClient as a ToolClient.
 *
 * Most methods pass through directly. Only `run` and `request`
 * are intercepted to decode PHP/HTTP response bytes into plain
 * strings via TextDecoder.
 */
export declare function createToolClient(client: PlaygroundClient): ToolClient;
