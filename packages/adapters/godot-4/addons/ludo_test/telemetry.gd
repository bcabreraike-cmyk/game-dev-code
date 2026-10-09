# Telemetry.gd
# This singleton collects and emits telemetry events as JSONL.

extends Node

# Singleton instance
var _instance: Telemetry

# File to write telemetry to (relative to project root)
var telemetry_file: String = "builds/telemetry/events.jsonl"

func _init() -> void:
    pass

func _ready() -> void:
    # Ensure the directory exists
    var dir = telemetry_file.get_base_dir()
    if dir != "" and not DirAccess.dir_exists_absolute(dir):
        DirAccess.make_absolute(dir)

func _exit_tree() -> void:
    # Close the file if open
    pass

# Get the singleton instance
static func get_singleton() -> Telemetry:
    if Telemetry._instance == null:
        Telemetry._instance = Telemetry.new()
    return Telemetry._instance

# Emit an event
func emit_event(event: String, data: Dictionary = {}) -> void:
    var event_dict = {
        "t_ms": Time.get_ticks_msec(),
        "frame": Engine.get_frames_drawn(),
        "event": event,
        "data": data
    }
    var json_line = JSON.stringify(event_dict)
    # Append to file
    var file = FileAccess.open(telemetry_file, FileAccess.WRITE)
    if file:
        file.seek_end()
        file.store_line(json_line)
        file.close()
    else:
        push_error("Could not open telemetry file for writing: " + telemetry_file)

# Mark a label (for test synchronization)
func mark(label: String) -> void:
    emit_event("telemetry_mark", {"label": label})
