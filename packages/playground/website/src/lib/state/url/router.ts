import type { SiteInfo } from '../redux/slice-sites';
import { updateUrl } from './router-hooks';
import { decodeBase64ToString } from '../../base64';

export function redirectTo(url: string) {
	window.history.pushState({}, '', url);
}

interface QueryAPIParams {
	name?: string;
	wp?: string;
	php?: string;
	language?: string;
	multisite?: 'yes' | 'no';
	networking?: 'yes' | 'no';
	theme?: string[];
	login?: 'yes' | 'no';
	plugin?: string[];
	blueprint?: string;
	'import-site'?: string;
	'import-wxr'?: string;
	'import-content'?: string;
	url?: string;
	'blueprint-url'?: string;
	'page-title'?: string;
}

export function parseBlueprint(rawData: string) {
	try {
		try {
			return JSON.parse(rawData);
		} catch {
			return JSON.parse(decodeBase64ToString(rawData));
		}
	} catch {
		throw new Error('Invalid blueprint');
	}
}

export class PlaygroundRoute {
	static site(site: SiteInfo, baseUrl: string = window.location.href) {
		if (site.metadata.storage === 'none') {
			return updateUrl(baseUrl, site.originalUrlParams || {});
		} else {
			const baseParams = new URLSearchParams(baseUrl.split('?')[1]);
			const preserveParamsKeys = [
				'mode',
				'networking',
				'login',
				'url',
				'page-title',
				'mcp',
				'mcp-port',
				'can-save',
			];
			const preserveParams: Record<string, string | null> = {};
			for (const param of preserveParamsKeys) {
				if (baseParams.has(param)) {
					preserveParams[param] = baseParams.get(param);
				}
			}
			return updateUrl(baseUrl, {
				searchParams: { 'site-slug': site.slug, ...preserveParams },
				hash: '',
			});
		}
	}
	static newTemporarySite(
		config: {
			query?: QueryAPIParams;
			hash?: string;
		} = {},
		baseUrl: string = window.location.href
	) {
		const query =
			(config.query as Record<string, string | undefined>) || {};
		return updateUrl(
			baseUrl,
			{
				searchParams: {
					...query,
					// Ensure a part of the URL is unique so we can still
					// reload the temporary site even if its configuration
					// hasn't changed.
					random: Math.random().toString(36).substring(2, 15),
				},
				hash: config.hash,
			},
			'replace'
		);
	}
}

/**
 * Checks if saving is disabled.
 * Features can be disabled either at build time (via VITE_CAN_SAVE env var)
 * or at runtime (via ?can-save=no query parameter).
 *
 * @returns {boolean} True if saving is disabled, false otherwise.
 */
export function isSaveDisabled(): boolean {
	// Check build-time environment variable first
	if (import.meta.env.VITE_CAN_SAVE === 'no') {
		return true;
	}
	// Fall back to query parameter check
	return (
		new URL(document.location.href).searchParams.get('can-save') === 'no'
	);
}

/**
 * Checks if the URL has a query parameter that disables saving.
 *
 * @deprecated Use isSaveDisabled() instead. This function is kept for backward compatibility.
 * @returns {boolean} True if saving is disabled by the query parameter, false otherwise.
 */
export function isSaveDisabledByQueryParam(): boolean {
	return isSaveDisabled();
}

/**
 * Checks if plugin/theme installation is disabled.
 * Features can be disabled either at build time (via VITE_CAN_INSTALL env var)
 * or at runtime (via ?can-install=no query parameter).
 *
 * @returns {boolean} True if installation is disabled, false otherwise.
 */
export function isInstallDisabled(): boolean {
	// Check build-time environment variable first
	if (import.meta.env.VITE_CAN_INSTALL === 'no') {
		return true;
	}
	// Fall back to query parameter check
	return (
		new URL(document.location.href).searchParams.get('can-install') ===
		'no'
	);
}

/**
 * Checks if the URL has a query parameter that disables plugin/theme installation.
 *
 * @deprecated Use isInstallDisabled() instead. This function is kept for backward compatibility.
 * @returns {boolean} True if installation is disabled by the query parameter, false otherwise.
 */
export function isInstallDisabledByQueryParam(): boolean {
	return isInstallDisabled();
}

/**
 * Checks if file editing is disabled.
 * Features can be disabled either at build time (via VITE_CAN_EDIT env var)
 * or at runtime (via ?can-edit=no query parameter).
 *
 * @returns {boolean} True if editing is disabled, false otherwise.
 */
export function isEditDisabled(): boolean {
	// Check build-time environment variable first
	if (import.meta.env.VITE_CAN_EDIT === 'no') {
		return true;
	}
	// Fall back to query parameter check
	return (
		new URL(document.location.href).searchParams.get('can-edit') === 'no'
	);
}

/**
 * Checks if the URL has a query parameter that disables file editing.
 *
 * @deprecated Use isEditDisabled() instead. This function is kept for backward compatibility.
 * @returns {boolean} True if editing is disabled by the query parameter, false otherwise.
 */
export function isEditDisabledByQueryParam(): boolean {
	return isEditDisabled();
}

/**
 * Checks if database editing is disabled.
 * Features can be disabled either at build time (via VITE_CAN_EDIT_DATABASE env var)
 * or at runtime (via ?can-edit-database=no query parameter).
 *
 * @returns {boolean} True if database editing is disabled, false otherwise.
 */
export function isDatabaseDisabled(): boolean {
	// Check build-time environment variable first
	if (import.meta.env.VITE_CAN_EDIT_DATABASE === 'no') {
		return true;
	}
	// Fall back to query parameter check
	return (
		new URL(document.location.href).searchParams.get('can-edit-database') === 'no'
	);
}

/**
 * Checks if the URL has a query parameter that disables database editing.
 *
 * @deprecated Use isDatabaseDisabled() instead. This function is kept for backward compatibility.
 * @returns {boolean} True if database editing is disabled by the query parameter, false otherwise.
 */
export function isDatabaseDisabledByQueryParam(): boolean {
	return isDatabaseDisabled();
}

/**
 * Checks if the download-as-zip feature is disabled.
 * Features can be disabled either at build time (via VITE_CAN_DOWNLOAD_ZIP env var)
 * or at runtime (via ?can-download-zip=no query parameter).
 *
 * @returns {boolean} True if download-as-zip is disabled, false otherwise.
 */
export function isDownloadZipDisabled(): boolean {
	if (import.meta.env.VITE_CAN_DOWNLOAD_ZIP === 'no') {
		return true;
	}
	return (
		new URL(document.location.href).searchParams.get('can-download-zip') === 'no'
	);
}

/**
 * Checks if the export-to-GitHub feature is disabled.
 * Features can be disabled either at build time (via VITE_CAN_EXPORT_GITHUB env var)
 * or at runtime (via ?can-export-github=no query parameter).
 *
 * @returns {boolean} True if export-to-GitHub is disabled, false otherwise.
 */
export function isExportGithubDisabled(): boolean {
	if (import.meta.env.VITE_CAN_EXPORT_GITHUB === 'no') {
		return true;
	}
	return (
		new URL(document.location.href).searchParams.get('can-export-github') === 'no'
	);
}

/**
 * Checks if the Blueprint tab is disabled.
 * Features can be disabled either at build time (via VITE_CAN_BLUEPRINT env var)
 * or at runtime (via ?can-blueprint=no query parameter).
 *
 * @returns {boolean} True if the Blueprint tab is disabled, false otherwise.
 */
export function isBlueprintDisabled(): boolean {
	if (import.meta.env.VITE_CAN_BLUEPRINT === 'no') {
		return true;
	}
	return (
		new URL(document.location.href).searchParams.get('can-blueprint') === 'no'
	);
}

/**
 * Checks if the MCP server bridge is enabled via the `?mcp=yes` query parameter.
 */
export function isMcpServerEnabled(): boolean {
	return new URL(document.location.href).searchParams.get('mcp') === 'yes';
}
