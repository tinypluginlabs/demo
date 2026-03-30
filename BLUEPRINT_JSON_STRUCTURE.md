# Blueprint JSON Structure Definition

## Overview
This document provides the structure definition for `/blueprints/blueprints.json` that controls the "Start a new Playground" overlay buttons.

## JSON Structure

```json
{
  "buttons": [
    {
      "id": "string",
      "title": "string",
      "path": "string",
      "disabled": false
    }
  ]
}
```

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `buttons` | Array | Yes | Array of button configuration objects |
| `buttons[].id` | String | Yes | Unique identifier for the button (used as React key) |
| `buttons[].title` | String | Yes | Display text shown under the button icon |
| `buttons[].path` | String | Yes | Navigation path (e.g., "/tinyrelated") |
| `buttons[].disabled` | Boolean | No | Whether the button is disabled (default: false) |

## Example Configuration

```json
{
  "buttons": [
    {
      "id": "tinyrelated",
      "title": "tinyRelated",
      "path": "/tinyrelated",
      "disabled": false
    },
    {
      "id": "tinyrating",
      "title": "tinyRating",
      "path": "/tinyrating",
      "disabled": false
    },
    {
      "id": "tinyevent",
      "title": "tinyEvent",
      "path": "/tinyevent",
      "disabled": false
    }
  ]
}
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

## Limitations

- All buttons currently use the WordPress icon (not configurable via JSON)
- The `disabled` field only affects button interaction, not visibility
- Button order in the JSON determines display order in the overlay

## Related Documentation

- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- Public directory README: `packages/playground/website/public/blueprints/README.md`
- TypeScript types: `packages/playground/website/src/lib/types/blueprints-config.ts`
