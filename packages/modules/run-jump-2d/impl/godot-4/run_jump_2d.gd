# RunJump2D.gd
# Implementation of the run-jump-2d module for Godot 4.
# This script assumes it is added to a CharacterBody2D or similar node that handles movement.

@tool
extends Node

# Exported parameters from module.yaml
@export var jump_height_tiles: float = 4.5
@export var coyote_ms: int = 100

# Internal state
var _jump_timer: float = 0.0
var _coyote_timer: float = 0.0
var _is_jumping: bool = false
var _just_landed: bool = false

# Constants (assuming 1 tile = 1 meter, and gravity is adjusted accordingly)
# We'll compute gravity and jump velocity based on desired jump height and time to apex.
# For simplicity, we assume a fixed time to apex of 0.5 seconds (can be made configurable).
var time_to_apex: float = 0.5
var gravity: float
var jump_velocity: float

func _ready() -> void:
    # Compute gravity and jump velocity from jump_height_tiles and time_to_apex
    # Using physics: v = g * t, h = 0.5 * g * t^2 => g = 2 * h / t^2, v = g * t
    var h: float = jump_height_tiles  # in tiles (meters)
    var t: float = time_to_apex
    gravity = (2 * h) / (t * t)
    jump_velocity = gravity * t
    # Also connect to input actions (assuming input-actions module provides these)
    # We'll rely on the node having access to Input (global) or we could receive signals.
    # For simplicity, we use Input directly.

func _process(delta: float) -> void:
    _update_timers(delta)
    _handle_jump_input()

func _update_timers(delta: float) -> void:
    if _is_jumping:
        _jump_timer += delta
    # Coyote timer: reset when on floor, increment when leaving floor
    # We need a way to know if we are on floor. For now, assume a signal from collision.
    # This is a placeholder; in a real implementation, we would receive a signal when on floor.
    pass

func _handle_jump_input() -> void:
    # Check for jump press using input-actions (assuming Input.is_action_just_pressed('jump') from input-actions module)
    if Input.is_action_just_pressed('jump'):
        _start_jump()
    # If jump is held, we could allow variable height (by reducing gravity) - placeholder.

func _start_jump() -> void:
    if not _is_jumping and (_coyote_timer > 0 or /* on floor */ true):  # placeholder for on floor
        _is_jumping = true
        _jump_timer = 0.0
        # Apply initial jump velocity (negative Y in Godot)
        # Assuming this node is a CharacterBody2D, we would set velocity.y = -jump_velocity
        # For now, we just emit event.
        emit_signal('jump_started')
        # In a real implementation, we would set the vertical velocity here.

func _update_jump_physics(delta: float) -> void:
    # Placeholder for actual jump physics (variable height, coyote time, etc.)
    pass

# Signals
signal jump_started
signal jump_ended
signal jump_height_reached
