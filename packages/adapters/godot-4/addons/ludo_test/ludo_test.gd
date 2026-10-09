# LudoTest.gd
# This is a singleton that provides testing utilities for Ludoforge in Godot 4.
# It is intended to be autoloaded as a singleton (e.g., in Project Settings -> Autoload).

extends Node

# Singleton instance
var _instance: LudoTest

func _init() -> void:
    pass

func _ready() -> void:
    pass

# Get the singleton instance
static func get_singleton() -> LudoTest:
    if LudoTest._instance == null:
        LudoTest._instance = LudoTest.new()
    return LudoTest._instance

# Methods to simulate input
func press(action: String, hold_ms: int = 0) -> void:
    # Simulate pressing an action
    # In a real implementation, we would use Input.set_action_strength or similar
    pass

func release(action: String) -> void:
    # Simulate releasing an action
    pass

func move_axis(axis_name: String, x: float, y: float, ms: int = 0) -> void:
    # Simulate moving an axis
    pass

func click(x: int, y: int) -> void:
    # Simulate a mouse click
    pass

func wait(ms: int) -> void:
    # Wait for a number of milliseconds
    # In a real test, we would yield or use await get_tree().create_timer(ms/1000.0).timeout
    pass

func wait_for(event_or_expr: Variant, timeout_ms: int = 5000) -> void:
    # Wait for an event or expression to become true
    pass

func get(path: String) -> Variant:
    # Get game state by path (e.g., "player/position")
    # In a real implementation, we would use get_node or similar
    return null

func assert(expr: bool, msg: String = "") -> void:
    # Assert that expr is true, otherwise print error and optionally stop
    if not expr:
        push_error("Assertion failed: " + msg)
        # In a test environment, we might want to throw or set a flag
        # For now, just error

func screenshot(name: String) -> void:
    # Take a screenshot and save it
    pass

func record_video(name: String, ms: int) -> void:
    # Record a video for ms milliseconds
    pass

func set_seed(n: int) -> void:
    # Set the random seed
    RandomGenerator.set_global_seed(n)

func time_scale(x: float) -> void:
    # Set the time scale
    Engine.time_scale = x

func fast_forward(ms: int) -> void:
    # Fast forward simulation by ms milliseconds
    # In a real implementation, we would call PhysicsServer2D.set_active(false) and step manually
    pass

func teleport(node: Node, position: Vector2) -> void:
    # Teleport a node to a position (only in tests)
    if node:
        node.global_position = position

func emit(signal: String, data: Array = []) -> void:
    # Emit a signal
    emit_signal(signal, *data)

func telemetry_mark(label: String) -> void:
    # Mark a point in telemetry
    # In a real implementation, this would send a marker to the Telemetry singleton
    var telemetry = Telemetry.get_singleton()
    telemetry.mark(label)
