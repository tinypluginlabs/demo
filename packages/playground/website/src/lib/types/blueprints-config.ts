/**
 * Configuration structure for /blueprints/blueprints.json
 *
 * This file defines the structure that the CI process should deploy
 * to /blueprints/blueprints.json for configuring the "Start a new Playground"
 * overlay buttons.
 *
 * Example JSON structure:
 * {
 *   "buttons": [
 *     {
 *       "id": "tinyrelated",
 *       "title": "tinyRelated",
 *       "path": "/tinyrelated",
 *       "disabled": false
 *     },
 *     {
 *       "id": "tinyrating",
 *       "title": "tinyRating",
 *       "path": "/tinyrating",
 *       "disabled": false
 *     }
 *   ]
 * }
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
	 * Whether the button should be disabled
	 * @default false
	 */
	disabled?: boolean;
}

/**
 * Root configuration object for blueprints.json
 */
export interface BlueprintsConfig {
	/**
	 * Array of button configurations
	 */
	buttons: BlueprintButton[];
}
