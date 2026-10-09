# HudBasic.gd
# Implementation of the hud-basic module for Godot 4.
# This script can be added to a CanvasLayer or Control node to display a HUD.

@tool
extends CanvasLayer

# Exported parameters from module.yaml
@export var show_health: bool = true
@export var show_score: bool = true

# Internal values
var health: int = 100
var score: int = 0

# UI nodes (to be instantiated or assigned)
var health_label: Label
var score_label: Label
var health_icon: TextureRect
var score_icon: TextureRect

func _ready() -> void:
    # Create simple labels if not provided
    if show_health:
        health_label = Label.new()
        health_label.text = "Health: " + str(health)
        add_child(health_label)
    if show_score:
        score_label = Label.new()
        score_label.text = "Score: " + str(score)
        add_child(score_label)
    # Icons would be added similarly if provided

func _process(delta: float) -> void:
    # Update labels if values changed
    if show_health and health_label:
        health_label.text = "Health: " + str(health)
    if show_score and score_label:
        score_label.text = "Score: " + str(score)

# Signals
signal health_changed(new_health)
signal score_changed(new_score)

# Public methods to update values
func set_health(new_health: int) -> void:
    health = new_health
    emit_signal('health_changed', health)

func set_score(new_score: int) -> void:
    score = new_score
    emit_signal('score_changed', score)
