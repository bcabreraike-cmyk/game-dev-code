# Contract for camera-2d-follow

## API
This module provides a simple camera follow behavior for 2D games.

## Events
- `camera_position_updated`: emitted when the camera position changes

## Invariants
- The module does not modify the target node directly; it only calculates the desired camera position.
- The module expects a target node to follow (provided via parameters or context).
