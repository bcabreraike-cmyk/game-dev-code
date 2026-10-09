# Camera2DFollow.gd
# Implementation of the camera-2d-follow module for Godot 4.
# This script can be added to a Camera2D node to follow a target.

@tool
extends Camera2D

# Exported parameters from module.yaml
@export var offset_x: float = 0
@export var offset_y: float = 0
@export var lerp_factor: float = 0.1

# The target node to follow (can be set externally)
var target: Node

func _ready() -> void:
    pass

func _process(delta: float) -> void:
    if target:
        var desired_position = target.global_position + Vector2(offset_x, offset_y)
        global_position = global_position.lerp(desired_position, lerp_factor)
        emit_signal('camera_position_updated', global_position)

# Signal
signal camera_position_updated
