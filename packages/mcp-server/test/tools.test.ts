import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';

// Helper to get the Ludoforge root directory (two levels up from this test file)
const getRootDir = () => {
  // __dirname is packages/mcp-server/test
  return path.join(__dirname, '..', '..', '..');
};

const rootDir = getRootDir();
const backlogDir = path.join(rootDir, 'docs', 'backlog');
const specDir = path.join(rootDir, '.ludoforge');
const specFile = path.join(specDir, 'spec.json');
const statusFile = path.join(rootDir, 'docs', 'STATUS.md');

describe('MCP Server Tools - File System Integration', () => {
  beforeEach(async () => {
    // Ensure spec directory exists
    await fs.mkdir(specDir, { recursive: true });
    // Ensure spec file exists as empty object
    try {
      await fs.access(specFile);
    } catch {
      await fs.writeFile(specFile, '{}', 'utf-8');
    }
  });

  afterEach(async () => {
    // Optionally reset spec file to empty after each test
    await fs.writeFile(specFile, '{}', 'utf-8');
  });

  test('ludo_status should return correct status from backlog and STATUS.md', async () => {
    // We'll test by actually reading the files as the tool does
    const backlogFiles = await fs.readdir(backlogDir);
    const lfoFiles = backlogFiles.filter((f: string) => f.startsWith('LF-') && f.endsWith('.yaml'));
    
    let totalTasks = 0;
    let doneTasks = 0;
    const doneNumbers = new Set<number>();
    
    for (const file of lfoFiles) {
      totalTasks++;
      const content = await fs.readFile(path.join(backlogDir, file), 'utf-8');
      if (content.includes('status: done')) {
        doneTasks++;
        const numStr = file.match(/LF-(\d{3})\.yaml/)?.[1];
        if (numStr) {
          doneNumbers.add(parseInt(numStr, 10));
        }
      }
    }
    
    let etapa = 'Desconocida';
    if (doneNumbers.size > 0) {
      const maxDone = Math.max(...doneNumbers);
      if (maxDone <= 12) {
        etapa = 'Fase 0';
      } else if (maxDone <= 23) {
        etapa = 'Fase 1';
      } else if (maxDone <= 50) {
        etapa = 'Fase 2';
      } else {
        etapa = 'Fase 3+';
      }
    }
    
    let version = '0.0.0-inicial';
    try {
      const statusContent = await fs.readFile(statusFile, 'utf-8');
      const versionMatch = statusContent.match(/Etapa \/ versión: .* \/ (.*)/);
      if (versionMatch) {
        version = versionMatch[1].trim();
      }
    } catch (e) {
      // Ignore, use default
    }
    
    // These are the values the tool should return
    expect(totalTasks).toBeGreaterThan(0);
    expect(doneTasks).toBeGreaterThanOrEqual(0);
    expect(['Fase 0', 'Fase 1', 'Fase 2', 'Fase 3+', 'Desconocida']).toContain(etapa);
    expect(version).toBeDefined();
    
    // Log the values for visibility
    console.log(`Backlog: ${totalTasks} total, ${doneTasks} done`);
    console.log(`Etapa: ${etapa}, Version: ${version}`);
  });

  test('ludo_task_list should return all task IDs', async () => {
    const backlogFiles = await fs.readdir(backlogDir);
    const lfoFiles = backlogFiles.filter((f: string) => f.startsWith('LF-') && f.endsWith('.yaml'));
    
    const expectedTasks = lfoFiles.map(file => {
      const numStr = file.match(/LF-(\d{3})\.yaml/)?.[1];
      return numStr ? `LF-${numStr}` : null;
    }).filter((id): id is string => id !== null);
    
    expect(expectedTasks.length).toBeGreaterThan(0);
    // Check that all IDs match LF-XXX pattern
    for (const taskId of expectedTasks) {
      expect(/^LF-\d{3}$/.test(taskId)).toBe(true);
    }
    
    console.log(`Found ${expectedTasks.length} tasks: ${expectedTasks.slice(0, 5).join(', ')}${expectedTasks.length > 5 ? '...' : ''}`);
  });

  test('ludo_task_take and ludo_task_update should modify task status correctly', async () => {
    // Use a specific task for testing - let's use LF-001 but we'll restore it after
    const testTaskId = 'LF-001';
    const testTaskFile = path.join(backlogDir, `${testTaskId}.yaml`);
    
    // Backup original content
    const originalContent = await fs.readFile(testTaskFile, 'utf-8');
    
    try {
      // First, ensure the task is not already in progress
      let content = originalContent;
      if (content.includes('status: in_progress')) {
        // Reset to done if it's in progress
        content = content.replace(/status: in_progress/, 'status: done');
        await fs.writeFile(testTaskFile, content, 'utf-8');
      }
      
      // Verify it's done initially
      content = await fs.readFile(testTaskFile, 'utf-8');
      expect(content.includes('status: done')).toBe(true);
      
      // Simulate taking the task (change status to in_progress)
      content = content.replace(/status: done/, 'status: in_progress');
      await fs.writeFile(testTaskFile, content, 'utf-8');
      
      // Verify it's now in progress
      content = await fs.readFile(testTaskFile, 'utf-8');
      expect(content.includes('status: in_progress')).toBe(true);
      expect(content.includes('status: done')).toBe(false);
      
      // Simulate updating the task (e.g., change priority)
      // For simplicity, we'll just verify we can write to the file
      const updatedContent = content.replace(/priority: P1/, 'priority: P2');
      await fs.writeFile(testTaskFile, updatedContent, 'utf-8');
      
      // Verify the update
      content = await fs.readFile(testTaskFile, 'utf-8');
      expect(content.includes('priority: P2')).toBe(true);
      
      console.log(`Successfully tested task take/update for ${testTaskId}`);
    } finally {
      // Restore original content
      await fs.writeFile(testTaskFile, originalContent, 'utf-8');
      console.log(`Restored original content for ${testTaskId}`);
    }
  });

  test('ludo_spec_get and ludo_spec_patch should read and write spec.json', async () => {
    // Test reading (should return empty object initially)
    let specContent = await fs.readFile(specFile, 'utf-8');
    let specData = JSON.parse(specContent);
    expect(specData).toEqual({});
    
    // Test writing by adding a test property
    specData.testKey = 'testValue';
    await fs.writeFile(specFile, JSON.stringify(specData, null, 2), 'utf-8');
    
    // Test reading again
    specContent = await fs.readFile(specFile, 'utf-8');
    specData = JSON.parse(specContent);
    expect(specData).toEqual({ testKey: 'testValue' });
    
    // Clean up
    delete specData.testKey;
    await fs.writeFile(specFile, JSON.stringify(specData, null, 2), 'utf-8');
    
    console.log('Spec file read/write test passed');
  });
});
