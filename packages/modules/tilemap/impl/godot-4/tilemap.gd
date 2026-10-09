# Tilemap.gd
# Implementation of the tilemap module for Godot 4.
# This script can be added to a Node to manage a tilemap.

@tool
extends Node

# Exported parameters from module.yaml
@export var tile_width: int = 64
@export var tile_height: int = 64
@export var columns: int = 20
@export var rows: int = 15

# The tileset (to be set externally, e.g., via inspector or script)
@export var tileset: TileSet

# Internal tilemap (optional, for simplicity we don't create a TileMap node here)
# In a real implementation, we would add a TileMap node as a child or use one.

func _ready() -> void:
    if tileset:
        # Create a TileMap node as a child
        var tilemap_node = TileMap.new()
        tilemap_node.tile_set = tileset
        tilemap_node.cell_size = Vector2(tile_width, tile_height)
        tilemap_node.map_size = Vector2(columns, rows)
        add_child(tilemap_node)
        emit_signal('tilemap_loaded', tilemap_node)
    else:
        push_warning("Tileset not set for tilemap module.")

# Signal
signal tilemap_loaded(tilemap_node)
signal tile_changed(x, y, tile_id)
