import { describe, test, expect } from 'vitest';
import { Orchestrator } from '../src/index';

describe('Orchestrator', () => {
  test('should exist', () => {
    const orchestrator = new Orchestrator();
    expect(orchestrator).toBeDefined();
  });

  test('should have a run method', async () => {
    const orchestrator = new Orchestrator();
    const result = await orchestrator.run();
    expect(result).toHaveProperty('status');
    expect(result.status).toBe('completed');
  });
});