# Blueprint JSON Structure Definition

## Overview
This document provides the structure definition for `/blueprints/blueprints.json` that controls the "Start a new Playground" overlay buttons.

## JSON Structure

The JSON file is a direct array of button configuration objects:

```json
[
  {
    "id": "string",
    "title": "string",
    "path": "string",
    "icon": "string",
    "disabled": false
  }
]
```

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `[].id` | String | Yes | Unique identifier for the button (used as React key) |
| `[].title` | String | Yes | Display text shown under the button icon |
| `[].path` | String | Yes | Navigation path (e.g., "/tinyrelated") |
| `[].icon` | String | No | Icon to display (React component name or SVG URL, default: "WordPressIcon") |
| `[].disabled` | Boolean | No | Whether the button is disabled (default: false) |

## Icon Configuration

The `icon` field supports two formats:

### 1. React Component Name
Specify the name of an icon component exported from `@wp-playground/components`:
- `"WordPressIcon"` - WordPress logo (default)
- `"ClockIcon"` - Clock icon
- `"playgroundLogo"` - Playground logo
- `"temporaryStorage"` - Temporary storage icon

### 2. SVG URL
Provide a direct URL to an SVG file:
- `"https://example.com/custom-icon.svg"`
- `"https://cdn.example.com/icons/my-icon.svg"`

If the `icon` field is omitted or an invalid component name is provided, the button will default to using `WordPressIcon`.

## Example Configuration

```json
[
  {
    "id": "tinyrelated",
    "title": "tinyRelated",
    "path": "/tinyrelated",
    "icon": "WordPressIcon",
    "disabled": false
  },
  {
    "id": "tinyrating",
    "title": "tinyRating",
    "path": "/tinyrating",
    "icon": "https://example.com/rating-icon.svg",
    "disabled": false
  },
  {
    "id": "tinyevent",
    "title": "tinyEvent",
    "path": "/tinyevent",
    "disabled": false
  }
]
```

## File Location

The JSON file should be deployed to:
```
/blueprints/blueprints.json
```

In the source repository, this maps to:
```
packages/playground/website/public/blueprints/blueprints.json
```

**Note:** This directory is in `.gitignore` and files are deployed by CI, not committed to the repository.

## TypeScript Type Definition

The structure is defined in TypeScript at:
```
packages/playground/website/src/lib/types/blueprints-config.ts
```

```typescript
export interface BlueprintButton {
  id: string;
  title: string;
  path: string;
  disabled?: boolean;
}

export interface BlueprintsConfig {
  buttons: BlueprintButton[];
}
```

## JSON Schema

A JSON Schema file is available for validation at:
```
packages/playground/website/public/blueprints/blueprints.schema.json
```

## Usage in Code

The configuration is loaded in the `SavedPlaygroundsOverlay` component:

```typescript
import { useFetch } from '../../lib/hooks/use-fetch';
import type { BlueprintsConfig } from '../../lib/types/blueprints-config';

const { data: blueprintsConfig } = useFetch<BlueprintsConfig>(
  '/blueprints/blueprints.json'
);
```

## Fallback Behavior

If the JSON file cannot be fetched (404, network error, etc.), the application will fall back to hardcoded default buttons to ensure the overlay always functions correctly.

## Validation

Before deploying, validate your JSON against the schema:

```bash
# Using a JSON schema validator
jsonschema -i blueprints.json blueprints.schema.json
```

## Button Behavior

When a button is clicked:
1. The browser navigates to the specified `path`
2. The path is resolved through the blueprint preset system
3. The corresponding blueprint ZIP file is loaded (e.g., `/blueprints/tinyrelated.zip`)

## Icon Resolution

Icons are resolved in the following order:
1. If `icon` is omitted, use `WordPressIcon` (default)
2. If `icon` starts with `http://` or `https://`, load as external SVG image
3. If `icon` matches a component name in `@wp-playground/components`, use that component
4. If none of the above, fall back to `WordPressIcon`

## Limitations

- The `disabled` field only affects button interaction, not visibility
- Button order in the JSON determines display order in the overlay
- External SVG icons must be accessible from the client (CORS considerations apply)

## Related Documentation

- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- Public directory README: `packages/playground/website/public/blueprints/README.md`
- TypeScript types: `packages/playground/website/src/lib/types/blueprints-config.ts`
