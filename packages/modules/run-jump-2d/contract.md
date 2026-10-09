# Contract for run-jump-2d

## API
This module provides jump mechanics with variable height, coyote time, and input buffering.

## Events
- `jump_started`: emitted when jump begins
- `jump_ended`: emitted when jump ends (landing or releasing early)
- `jump_height_reached`: emitted when peak height is reached

## Invariants
- The module depends on input-actions for jump input.
- The module does not handle horizontal movement; that should be provided by other modules (e.g., run).
