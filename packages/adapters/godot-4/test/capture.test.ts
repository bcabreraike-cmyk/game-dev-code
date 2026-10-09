import { godot4Adapter } from '../src/index';
import { existsSync } from 'fs';

describe('Godot4Adapter capture', () => {
  test('should return a path for screenshot', async () => {
    const result = await godot4Adapter.capture('screenshot', {});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(existsSync(result[0])).toBe(true);
  });

  test('should return a path for video', async () => {
    const result = await godot4Adapter.capture('video', {});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(existsSync(result[0])).toBe(true);
  });
});
