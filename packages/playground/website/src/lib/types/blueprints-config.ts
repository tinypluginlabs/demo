/**
 * Configuration structure for /blueprints/blueprints.json
 *
 * This file defines the structure that the CI process should deploy
 * to /blueprints/blueprints.json for configuring the "Start a new Playground"
 * overlay buttons.
 *
 * Example JSON structure (array of button objects):
 * [
 *   {
 *     "id": "tinyrelated",
 *     "title": "tinyRelated",
 *     "path": "/tinyrelated",
 *     "icon": "WordPressIcon",
 *     "disabled": false
 *   },
 *   {
 *     "id": "tinyrating",
 *     "title": "tinyRating",
 *     "path": "/tinyrating",
 *     "icon": "https://example.com/icon.svg",
 *     "disabled": false
 *   }
 * ]
 */

/**
 * Configuration for a single button in the overlay
 */
export interface BlueprintButton {
	/**
	 * Unique identifier for the button
	 */
	id: string;

	/**
	 * Display title shown under the icon
	 */
	title: string;

	/**
	 * Navigation path (e.g., "/tinyrelated")
	 */
	path: string;

	/**
	 * Icon to display on the button
	 * Can be:
	 * - A React component name from @wp-playground/components (e.g., "WordPressIcon", "ClockIcon")
	 * - A URL to an SVG file (e.g., "https://example.com/icon.svg")
	 * - If omitted, defaults to "WordPressIcon"
	 */
	icon?: string;

	/**
	 * Whether the button should be disabled
	 * @default false
	 */
	disabled?: boolean;
}

/**
 * Root configuration type for blueprints.json
 * The JSON file should be a direct array of BlueprintButton objects
 */
export type BlueprintsConfig = BlueprintButton[];
