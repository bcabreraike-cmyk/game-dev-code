# Contract for hud-basic

## API
This module provides a basic HUD for 2D games, showing health and score.

## Events
- `health_changed`: emitted when health value changes
- `score_changed`: emitted when score value changes

## Invariants
- The module does not handle input directly; it only displays values.
- The module expects a font and optional icons to be provided (via asset_needs).
