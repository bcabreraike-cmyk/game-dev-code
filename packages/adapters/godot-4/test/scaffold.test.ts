import { godot4Adapter } from '../src/index';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

describe('Godot4Adapter scaffold', () => {
  test('should create a minimal Godot project', async () => {
    const spec = { id: 'test-game' };
    const opts = { outputDir: tmpdir() };
    const result = await godot4Adapter.scaffold(spec, opts);
    // Check that the result indicates files were created
    expect(result.created.length).toBeGreaterThan(0);
    // Check that the files exist (in a real test we would check the actual files)
    // For now, we just check that the method returns something.
    expect(result).toBeDefined();
  });
});
