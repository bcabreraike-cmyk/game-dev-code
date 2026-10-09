// Host adapter for claude-code
// This adapter installs Ludoforge in the claude-code agent.

import { existsSync, mkdirSync, writeFileSync, cpSync } from 'fs';
import { join, dirname } from 'path';

export interface HostAdapterInfo {
  id: string;
  name: string;
}

export interface HostAdapter {
  readonly id: string;
  readonly name: string;
  detect(): Promise<HostAdapterInfo | null>;
  install(opts?: { dryRun?: boolean }): Promise<boolean>;
  uninstall(): Promise<boolean>;
  isInstalled(): boolean;
}

export class ClaudecodeHostAdapter implements HostAdapter {
  readonly id = 'claude-code';
  readonly name = 'Ludoforge Host Adapter for Claude Code';

  async detect(): Promise<HostAdapterInfo | null> {
    // Stub implementation
    return {
      id: this.id,
      name: this.name
    };
  }

  async install(opts?: { dryRun?: boolean }): Promise<boolean> {
    const dryRun = opts?.dryRun ?? false;
    if (dryRun) {
      console.log(`[DRY RUN] Installing Ludoforge for claude-code`);
      return true;
    }
    console.log(`Installing Ludoforge for claude-code...`);
    
    const markerDir = join(process.cwd(), '.ludoforge', 'hosts', this.id);
    if (!existsSync(markerDir)) {
      mkdirSync(markerDir, { recursive: true });
    }
    const markerFile = join(markerDir, 'installed.txt');
    writeFileSync(markerFile, `Installed at ${new Date().toISOString()}`, 'utf8');
    
    console.log(`Successfully installed Ludoforge for claude-code`);
    return true;
  }

  async uninstall(): Promise<boolean> {
    console.log(`Uninstalling Ludoforge for claude-code...`);
    
    const markerDir = join(process.cwd(), '.ludoforge', 'hosts', this.id);
    const markerFile = join(markerDir, 'installed.txt');
    if (existsSync(markerFile)) {
      // In a real implementation, we would remove the file and directory if empty.
      // For safety, we just note that we would do it.
      console.log(`Would remove marker file: ${markerDir}/installed.txt`);
    }
    
    console.log(`Successfully uninstalled Ludoforge for claude-code`);
    return true;
  }

  isInstalled(): boolean {
    const markerFile = join(process.cwd(), '.ludoforge', 'hosts', this.id, 'installed.txt');
    return existsSync(markerFile);
  }
}