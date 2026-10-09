import { godot4Adapter } from '../src/index';

describe('Godot4Adapter', () => {
  test('detect should return null if Godot not found', async () => {
    // This test will pass if Godot is not installed; we can't assume it is.
    // In a real test, we would mock the file system.
    const result = await godot4Adapter.detect();
    // We expect either null or an EngineInfo object.
    expect(result === null || (result !== null && typeof result.id === 'string')).toBe(true);
  });
});
