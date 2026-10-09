# Contract for tilemap

## API
This module provides a tilemap for 2D games.

## Events
- `tilemap_loaded`: emitted when the tilemap is loaded
- `tile_changed`: emitted when a tile changes (x, y, tile_id)

## Invariants
- The module does not handle collision directly; that should be provided by a collision module or physics body.
- The module expects a tileset to be provided (via asset_needs or parameters).
