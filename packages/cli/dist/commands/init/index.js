"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
exports.initCommand = new commander_1.Command('init')
    .description('Install Ludoforge in the host')
    .option('--host <H>', 'specify host to install for')
    .option('--dry-run', 'show what would be done without making changes')
    .option('--uninstall', 'uninstall Ludoforge from the host')
    .action(async (opts) => {
    const host = opts.host ?? 'generic';
    const dryRun = opts.dryRun;
    const uninstall = opts.uninstall;
    try {
        console.log(`Installing Ludoforge for host: ${host}`);
        if (uninstall) {
            console.log(`Uninstalling Ludoforge for host: ${host}`);
        }
        else {
            if (dryRun) {
                console.log(`[DRY RUN] Would install Ludoforge for ${host}`);
            }
            else {
                const markerDir = path.join(process.cwd(), '.ludoforge', 'hosts', host);
                if (!fs.existsSync(markerDir)) {
                    fs.mkdirSync(markerDir, { recursive: true });
                }
                const markerFile = path.join(markerDir, 'installed.txt');
                fs.writeFileSync(markerFile, `Installed at ${new Date().toISOString()}`, 'utf8');
                console.log(`Successfully installed Ludoforge for ${host}`);
            }
        }
    }
    catch (error) {
        console.error(`Failed to ${uninstall ? 'uninstall' : 'install'} Ludoforge for ${host}:`, error);
        process.exit(1);
    }
});
//# sourceMappingURL=index.js.map