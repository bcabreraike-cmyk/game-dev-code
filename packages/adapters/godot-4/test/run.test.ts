import { godot4Adapter } from '../src/index';

describe('Godot4Adapter run', () => {
  test('should return success placeholder', async () => {
    const result = await godot4Adapter.run({ headless: true });
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('logs');
  });
});
