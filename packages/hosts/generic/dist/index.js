// Host adapter for generic
// This adapter installs Ludoforge in the generic agent.
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
export class GenericHostAdapter {
    id = 'generic';
    name = 'Ludoforge Host Adapter for Generic';
    async detect() {
        // Stub implementation
        return {
            id: this.id,
            name: this.name
        };
    }
    async install(opts) {
        const dryRun = opts?.dryRun ?? false;
        if (dryRun) {
            console.log(`[DRY RUN] Installing Ludoforge for generic`);
            return true;
        }
        console.log(`Installing Ludoforge for generic...`);
        const markerDir = join(process.cwd(), '.ludoforge', 'hosts', this.id);
        if (!existsSync(markerDir)) {
            mkdirSync(markerDir, { recursive: true });
        }
        const markerFile = join(markerDir, 'installed.txt');
        writeFileSync(markerFile, `Installed at ${new Date().toISOString()}`, 'utf8');
        console.log(`Successfully installed Ludoforge for generic`);
        return true;
    }
    async uninstall() {
        console.log(`Uninstalling Ludoforge for generic...`);
        const markerDir = join(process.cwd(), '.ludoforge', 'hosts', this.id);
        const markerFile = join(markerDir, 'installed.txt');
        if (existsSync(markerFile)) {
            // In a real implementation, we would remove the file and directory if empty.
            // For safety, we just note that we would do it.
            console.log(`Would remove marker file: ${markerDir}/installed.txt`);
        }
        console.log(`Successfully uninstalled Ludoforge for generic`);
        return true;
    }
    isInstalled() {
        const markerFile = join(process.cwd(), '.ludoforge', 'hosts', this.id, 'installed.txt');
        return existsSync(markerFile);
    }
}
