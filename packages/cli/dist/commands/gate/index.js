"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gateCommand = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const path_1 = require("path");
exports.gateCommand = new commander_1.Command('gate')
    .description('Check quality gate')
    .option('--etapa <E>', 'stage to check')
    .option('--dry-run', 'run in dry run mode', false)
    .option('--approve', 'approve the gate', false)
    .action(async (opts) => {
    const etapa = opts.etapa;
    const dryRun = opts.dryRun;
    const approve = opts.approve;
    console.log(`Gate check: etapa=${etapa ?? 'none'}, dryRun=${dryRun}, approve=${approve}...`);
    const mcpServer = (0, path_1.join)(__dirname, '../../../../mcp-server/dist/index.js');
    const server = (0, child_process_1.spawn)('node', [mcpServer], {
        stdio: ['pipe', 'pipe', 'inherit']
    });
    let responseData = '';
    server.stdout.on('data', (data) => {
        responseData += data.toString();
    });
    const request = {
        jsonrpc: '2.0',
        id: 1,
        method: 'ludo_gate',
        params: { etapa, dry_run: dryRun, approve }
    };
    server.stdin.write(JSON.stringify(request) + '\n');
    server.stdin.end();
    await new Promise((resolve, reject) => {
        server.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`MCP server exited with code ${code}`));
                return;
            }
            try {
                const resp = JSON.parse(responseData.trim());
                if (resp.error) {
                    console.error(`Gate failed: ${resp.error.message}`);
                    process.exit(1);
                }
                else {
                    console.log(`Gate result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
                }
            }
            catch (e) {
                console.error('Failed to parse MCP server response:', e);
                console.log('Raw response:', responseData);
            }
            resolve();
        });
        server.on('error', (err) => {
            reject(err);
        });
    });
});
//# sourceMappingURL=index.js.map