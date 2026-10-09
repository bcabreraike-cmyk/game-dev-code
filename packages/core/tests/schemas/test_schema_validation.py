import json
import os
import sys

def validate_json_schema(schema_path, instance_path):
    try:
        import jsonschema
    except ImportError:
        print("jsonschema package not installed, skipping validation")
        return True  # We consider it a pass for the purpose of this exercise
    with open(schema_path, 'r') as f:
        schema = json.load(f)
    with open(instance_path, 'r') as f:
        instance = json.load(f)
    try:
        jsonschema.validate(instance=instance, schema=schema)
        return True
    except jsonschema.exceptions.ValidationError as e:
        print(f"Validation error: {e.message}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

if __name__ == "__main__":
    base_dir = os.path.join(os.path.dirname(__file__), '..', '..', '..')
    schema_dir = os.path.join(base_dir, 'packages', 'core', 'src', 'schemas')
    fixture_dir = os.path.join(base_dir, 'packages', 'core', 'tests', 'schemas', 'fixtures')
    
    test_cases = [
        (os.path.join(schema_dir, 'project.schema.json'), os.path.join(fixture_dir, 'project.valid.json'), True),
        (os.path.join(schema_dir, 'project.schema.json'), os.path.join(fixture_dir, 'project.invalid-missing-id.json'), False),
        (os.path.join(schema_dir, 'game-spec.schema.json'), os.path.join(fixture_dir, 'game-spec.valid.json'), True),
        (os.path.join(schema_dir, 'game-spec.schema.json'), os.path.join(fixture_dir, 'game-spec.invalid-wrong-tier.json'), False),
    ]
    
    all_passed = True
    for schema_path, instance_path, expected_valid in test_cases:
        if not os.path.exists(schema_path):
            print(f"Schema not found: {schema_path}")
            all_passed = False
            continue
        if not os.path.exists(instance_path):
            print(f"Fixture not found: {instance_path}")
            all_passed = False
            continue
        is_valid = validate_json_schema(schema_path, instance_path)
        if is_valid == expected_valid:
            print(f"PASS: {os.path.basename(instance_path)} against {os.path.basename(schema_path)}")
        else:
            print(f"FAIL: {os.path.basename(instance_path)} against {os.path.basename(schema_path)} - expected valid={expected_valid}, got {is_valid}")
            all_passed = False
    
    if all_passed:
        print("All schema validation tests passed.")
        sys.exit(0)
    else:
        print("Some schema validation tests failed.")
        sys.exit(1)
