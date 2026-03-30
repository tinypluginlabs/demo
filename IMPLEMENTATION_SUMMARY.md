# Blueprint Buttons Configuration - Implementation Summary

## Overview
This document describes the implementation of dynamic blueprint buttons in the "Start a new Playground" overlay, which now reads from `/blueprints/blueprints.json` instead of using hardcoded values.

## Changes Made

### 1. TypeScript Type Definitions
**File:** `packages/playground/website/src/lib/types/blueprints-config.ts`

Defines the structure for the `blueprints.json` file:

```typescript
export interface BlueprintButton {
  id: string;              // Unique identifier
  title: string;           // Display title
  path: string;            // Navigation path
  disabled?: boolean;      // Optional: button disabled state
}

export interface BlueprintsConfig {
  buttons: BlueprintButton[];
}
```

### 2. Component Updates
**File:** `packages/playground/website/src/components/saved-playgrounds-overlay/index.tsx`

Updated the `SavedPlaygroundsOverlay` component to:
- Use the `useFetch` hook to load `/blueprints/blueprints.json`
- Fall back to hardcoded defaults if the JSON file cannot be fetched
- Transform the JSON data into button configurations with onClick handlers

Key changes:
```typescript
// Fetch from JSON
const { data: blueprintsConfig } = useFetch<BlueprintsConfig>(
  '/blueprints/blueprints.json'
);

// Fallback to defaults
const defaultCreationOptions = [...];
const buttonsConfig = blueprintsConfig?.buttons || defaultCreationOptions;

// Transform to button props
const creationOptions = buttonsConfig.map((button) => ({
  id: button.id,
  title: button.title,
  iconComponent: <WordPressIcon />,
  onClick: () => { window.location.href = button.path; },
  disabled: button.disabled ?? false,
}));
```

### 3. Documentation
**File:** `packages/playground/website/public/blueprints/README.md`

Comprehensive documentation explaining:
- The JSON structure and schema
- Each property's purpose and type
- Example configuration
- Deployment process
- Fallback behavior

## JSON File Structure

The CI process should deploy a `blueprints.json` file to `/blueprints/blueprints.json` with the following structure:

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

## Behavior

### Normal Operation
1. When the overlay loads, it fetches `/blueprints/blueprints.json`
2. If successful, buttons are created from the JSON data
3. Each button navigates to the specified `path` when clicked

### Fallback Mechanism
If the JSON file cannot be fetched (404, network error, etc.):
- The component uses hardcoded default buttons (same as the original implementation)
- This ensures the overlay always displays buttons, even if the JSON file is missing

### Loading State
- The component doesn't show a loading spinner
- Buttons appear immediately using defaults or fetched data
- This provides a seamless user experience

## Testing

### Type Checking
```bash
npx nx typecheck playground-website
```
✅ Passed

### Linting
```bash
npx nx lint playground-website
```
✅ Passed

### Dev Server
```bash
npm run dev
```
✅ Started successfully at http://127.0.0.1:5400/

## Deployment Notes

1. **JSON File Location**: The `blueprints.json` file should be deployed to the public directory at `/blueprints/blueprints.json`

2. **Git Ignore**: The `/blueprints/` directory is already in `.gitignore`, so the JSON file won't be committed to the repository

3. **CI Process**: The CI process should deploy the JSON file separately from the application build

4. **Validation**: Consider adding JSON schema validation in your CI process to ensure the file structure is correct before deployment

## Icon Customization

Currently, all buttons use the `WordPressIcon` component. If you need to support different icons in the future, you would need to:
1. Add an `icon` field to the `BlueprintButton` interface
2. Create a mapping of icon names to icon components
3. Update the button rendering logic to use the specified icon

## Security Considerations

The implementation:
- Uses standard fetch API (no eval or dynamic code execution)
- Only reads from a known, controlled endpoint (`/blueprints/blueprints.json`)
- Uses TypeScript for type safety
- Falls back to safe defaults if fetch fails

The existing .htaccess rules protecting the `/blueprints/` directory continue to apply.
