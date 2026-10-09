import { godot4Adapter } from '../src/index';

describe('Godot4Adapter export', () => {
  test('should return success placeholder', async () => {
    const result = await godot4Adapter.export('windows', {});
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('exportedPath');
  });
});
