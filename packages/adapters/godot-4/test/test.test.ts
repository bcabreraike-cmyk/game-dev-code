import { godot4Adapter } from '../src/index';

describe('Godot4Adapter test', () => {
  test('should return success placeholder', async () => {
    const result = await godot4Adapter.test('some/scenario.yaml');
    expect(result.success).toBe(true);
    expect(result.passed).toBe(true);
  });
});
