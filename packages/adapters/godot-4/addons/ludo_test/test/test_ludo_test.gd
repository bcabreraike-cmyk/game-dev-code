# Test script for LudoTest addon
# This script can be attached to a Node in a test scene to verify the addon works.

extends Node

func _ready() -> void:
    var ludo_test = LudoTest.get_singleton()
    var telemetry = Telemetry.get_singleton()
    
    # Test that we can get the singletons
    assert(ludo_test != null, "LudoTest singleton should exist")
    assert(telemetry != null, "Telemetry singleton should exist")
    
    # Test a simple method
    ludo_test.press("ui_accept", 100)
    ludo_test.release("ui_accept")
    
    # Test telemetry mark
    telemetry.mark("test_start")
    
    # If we reach here, the test passes
    print("LudoTest addon test passed")
    # In a real test suite, we would report success
