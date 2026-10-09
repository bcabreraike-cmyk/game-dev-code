"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askCommand = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const path_1 = require("path");
exports.askCommand = new commander_1.Command('ask')
    .description('Manage questions')
    .option('--accion <A>', 'action: list, show, answer, defer', 'list')
    .option('--pregunta-id <I>', 'question ID')
    .option('--respuesta <R>', 'answer text')
    .action(async (opts) => {
    const accion = opts.accion;
    const preguntaId = opts.preguntaId ?? undefined;
    const respuesta = opts.respuesta ?? undefined;
    console.log(`Ask action: ${accion}, preguntaId: ${preguntaId ?? 'none'}, respuesta: ${respuesta ?? 'none'}...`);
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
        method: 'ludo_ask',
        params: { accion, pregunta_id: preguntaId, respuesta }
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
                    console.error(`Ask failed: ${resp.error.message}`);
                    process.exit(1);
                }
                else {
                    console.log(`Ask result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
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