# InputActions.gd
# Implementation of the input-actions module for Godot 4.
# This script can be autoloaded or added to nodes to provide input actions.

extends Node

# Define input actions (these should match those in project.godot/input_map)
# For simplicity, we assume the input map is set up elsewhere.

func _ready() -> void:
    pass

# Example: check if jump action is pressed
func is_jump_pressed() -> bool:
    return Input.is_action_pressed('jump')

# Example: check if jump action is just pressed
func is_jump_just_pressed() -> bool:
    return Input.is_action_just_pressed('jump')

# Example: get jump axis strength (0 to 1)
func get_jump_strength() -> float:
    return Input.get_action_strength('jump')
