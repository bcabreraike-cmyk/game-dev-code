import { godot4Adapter } from '../src/index';

describe('Godot4Adapter profile', () => {
  test('should return dummy metrics', async () => {
    const result = await godot4Adapter.profile({});
    expect(result).toHaveProperty('fps');
    expect(result).toHaveProperty('frameTimeMs');
    expect(result).toHaveProperty('memoryMb');
  });
});
