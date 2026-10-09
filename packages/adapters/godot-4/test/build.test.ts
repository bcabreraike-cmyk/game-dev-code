import { godot4Adapter } from '../src/index';

describe('Godot4Adapter build', () => {
  test('should return success placeholder', async () => {
    const result = await godot4Adapter.build('windows', {});
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('artifactPath');
  });
});
