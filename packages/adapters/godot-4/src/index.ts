// Godot 4 adapter for Ludoforge
// This is a basic implementation that will be expanded in subsequent tasks.

import { existsSync, readFileSync, writeFileSync, mkdirSync, copySync } from 'fs';
import { spawn } from 'child_process';
import { join, dirname } from 'path';

// We'll define the EngineAdapter interface as per the spec, but we'll implement a subset.
export interface EngineInfo {
  id: string;
  version: string;
  path: string;
}

export interface EngineAdapter {
  readonly id: string;
  detect(): Promise<EngineInfo | null>;
  scaffold(spec: any, opts: any): Promise<any>; // ChangeSet placeholder
  applyModule(moduleId: string, params: Record<string, unknown>): Promise<any>;
  importAsset(asset: any): Promise<any>;
  build(target: any, opts: any): Promise<any>;
  run(opts: { headless: boolean; scene?: string; args?: string[] }): Promise<any>;
  test(scenarioPath: string): Promise<any>;
  capture(kind: 'screenshot' | 'video', opts: any): Promise<string[]>;
  profile(opts: any): Promise<any>;
  export(target: any, opts: any): Promise<any>;
  capabilities(): any; // AdapterCapabilities
}

export class Godot4Adapter implements EngineAdapter {
  readonly id = 'godot-4';
  private readonly version = '4.2.1'; // From ADR 0006
  private godotPath: string | null = null;

  async detect(): Promise<EngineInfo | null> {
    // Try to find godot executable in common locations
    const possiblePaths = [
      // Windows
      'C:/Program Files/Godot/Godot_v4.2.1-stable_win64.exe',
      'C:/Program Files (x86)/Godot/Godot_v4.2.1-stable_win64.exe',
      // macOS
      '/Applications/Godot_v4.2.1-stable.app/Contents/MacOS/Godot',
      // Linux
      '/usr/bin/godot',
      '/usr/local/bin/godot',
    ];

    for (const path of possiblePaths) {
      if (existsSync(path)) {
        this.godotPath = path;
        return {
          id: this.id,
          version: this.version,
          path: this.godotPath
        };
      }
    }

    // Try to run godot --version to see if it's in PATH
    try {
      const result = await new Promise<{ stdout: string }>((resolve, reject) => {
        const proc = spawn('godot', ['--version']);
        let stdout = '';
        proc.stdout.on('data', (data) => { stdout += data; });
        proc.on('close', (code) => {
          if (code === 0) {
            resolve({ stdout });
          } else {
            reject(new Error('Godot not found'));
          }
        });
      });
      // If we get here, godot is in PATH
      this.godotPath = 'godot'; // Assume it's in PATH
      return {
        id: this.id,
        version: this.version,
        path: this.godotPath
      };
    } catch (e) {
      // Godot not found
      return null;
    }
  }

  async scaffold(spec: any, opts: any): Promise<any> {
    // In a real implementation, this would create a Godot project from the spec.
    // For now, we'll create a minimal Godot project in the specified output directory.
    const outputDir = opts?.outputDir || process.cwd();
    const projectName = spec?.id || 'my-game';

    // Ensure output directory exists
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const projectDir = join(outputDir, projectName);
    if (!existsSync(projectDir)) {
      mkdirSync(projectDir);
    }

    // Create project.godot
    const projectGodotContent = `[config]` + '\n' +
      `application/config/icon = "res://icon.svg"` + '\n' +
      `application/config/name = "${projectName}"` + '\n' +
      `application/run/main_scene = "res://${projectName}.tscn"` + '\n' + '\n' +
      `[rendering]` + '\n' + '\n' +
      `[interface]` + '\n' + '\n' +
      `[editor]` + '\n' + '\n' +
      `[input]` + '\n' + '\n' +
      `[debug]` + '\n' + '\n' +
      `[compatibility]` + '\n';

    writeFileSync(join(projectDir, 'project.godot'), projectGodotContent);

    // Create a default scene (empty)
    const defaultSceneContent = `[gd_scene load_steps=1 format=2 uid="UID" ]` + '\n' +
      `[node name="Root" type="Node"]` + '\n';

    writeFileSync(join(projectDir, `${projectName}.tscn`), defaultSceneContent);

    // Create a default script for the main node (optional)
    const defaultScriptContent = `extends Node` + '\n' +
      `func _ready() -> void:` + '\n' +
      `  pass` + '\n';

    writeFileSync(join(projectDir, `${projectName}.gd`), defaultScriptContent);

    // Create the addons directory and copy the ludo_test addon
    const addonsDir = join(projectDir, 'addons');
    if (!existsSync(addonsDir)) {
      mkdirSync(addonsDir);
    }
    const ludoTestAddonDir = join(addonsDir, 'ludo_test');
    if (!existsSync(ludoTestAddonDir)) {
      mkdirSync(ludoTestAddonDir);
    }
    // Copy the source files of the addon
    const adapterRoot = join(dirname(__dirname), '..'); // packages/adapters/godot-4
    const sourceAddonPath = join(adapterRoot, 'addons', 'ludo_test');
    if (existsSync(sourceAddonPath)) {
      copySync(sourceAddonPath, ludoTestAddonDir);
    }

    // Return a ChangeSet (simplified)
    return {
      created: [
        join(projectDir, 'project.godot'),
        join(projectDir, `${projectName}.tscn`),
        join(projectDir, `${projectName}.gd`),
        join(projectDir, 'addons', 'ludo_test')
      ],
      modified: []
    };
  }

  async applyModule(moduleId: string, params: Record<string, unknown>): Promise<any> {
    console.log(`Applying module ${moduleId} (placeholder)`);
    // In a real implementation, this would apply a module to the project.
    return { created: [], modified: [] };
  }

  async importAsset(asset: any): Promise<any> {
    console.log(`Importing asset (placeholder)`);
    // In a real implementation, this would import an asset into the project.
    return { created: [], modified: [] };
  }

  async build(target: any, opts: any): Promise<any> {
    console.log(`Building for target ${target} (placeholder)`);
    // In a real implementation, we would call the godot executable to export the project.
    // For now, we simulate a successful build.
    return { success: true, artifactPath: join(process.cwd(), 'builds', `${target}.exe`) };
  }

  async run(opts: { headless: boolean; scene?: string; args?: string[] }): Promise<any> {
    console.log(`Running Godot project (headless: ${opts.headless}) (placeholder)`);
    // In a real implementation, we would spawn the godot process with the appropriate arguments.
    // For now, we simulate a successful run.
    return { success: true, logs: `Simulated run with headless=${opts.headless}` };
  }

  async test(scenarioPath: string): Promise<any> {
    console.log(`Testing scenario ${scenarioPath} (placeholder)`);
    // In a real implementation, we would load the scenario and run it using LudoTest.
    // For now, we simulate a successful test.
    return { success: true, passed: true };
  }

  async capture(kind: 'screenshot' | 'video', opts: any): Promise<string[]> {
    console.log(`Capturing ${kind} (placeholder)`);
    // In a real implementation, we would capture screenshot or video.
    // For now, we return an empty array or a dummy path.
    const dummyPath = join(process.cwd(), 'builds', 'captures', `${kind}_dummy.png`);
    // Ensure directory exists
    const dir = dirname(dummyPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    // Write a dummy file to simulate capture
    writeFileSync(dummyPath, '', 'utf8');
    return [dummyPath];
  }

  async profile(opts: any): Promise<any> {
    console.log(`Profiling (placeholder)`);
    // In a real implementation, we would run profiling tools.
    // For now, we return dummy metrics.
    return { fps: 60, frameTimeMs: 16.6, memoryMb: 128 };
  }

  async export(target: any, opts: any): Promise<any> {
    console.log(`Exporting to ${target} (placeholder)`);
    // In a real implementation, we would call the godot executable to export the project.
    // For now, we simulate a successful export.
    return { success: true, exportedPath: join(process.cwd(), 'exports', `${target}.zip`) };
  }

  capabilities(): any {
    return {
      '2d': true,
      '3d': true,
      'vr': false,
      'headless_render': true,
      'video_capture': false
    };
  }
}

// Export a singleton instance
export const godot4Adapter = new Godot4Adapter();
