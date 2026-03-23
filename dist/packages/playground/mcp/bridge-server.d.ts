import { WebSocketServer } from 'ws';
export interface SiteRegistration {
    slug: string;
    name: string;
    storage: string;
    isActive: boolean;
}
export interface BridgeSiteInfo {
    siteId: string;
    name: string;
    storage: string;
    isActive: boolean;
}
export interface SiteEntry {
    siteSlug: string;
    siteName: string;
    storage: string;
    reportedByTabs: Set<string>;
    activeInTabs: string[];
}
export declare class PlaygroundBridge {
    private connections;
    private sites;
    private pendingRequests;
    private requestId;
    private wss;
    private httpServer;
    private sessionToken;
    private siteActivatedListeners;
    getPort(): number;
    startWebSocketServer(port?: number): Promise<WebSocketServer>;
    private handleHttpRequest;
    private handleConnection;
    private updateSitesForTab;
    sendCommand(siteId: string, method: string, args?: unknown[]): Promise<unknown>;
    waitForSiteActive(siteId: string, timeoutMs: number): Promise<SiteEntry>;
    private removeSiteActivatedListener;
    listSites(): BridgeSiteInfo[];
    getTabCount(): number;
    isConnected(): boolean;
    close(): Promise<void>;
}
