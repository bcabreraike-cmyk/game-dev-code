"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCommand = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const path_1 = require("path");
exports.verifyCommand = new commander_1.Command('verify')
    .description('Verify a task')
    .argument('<task-id>', 'task ID to verify')
    .action(async (taskId) => {
    console.log(`Verifying task: ${taskId}...`);
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
        method: 'ludo_verify',
        params: { task_id: taskId }
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
                    console.error(`Verification failed: ${resp.error.message}`);
                    process.exit(1);
                }
                else {
                    console.log(`Verification result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
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