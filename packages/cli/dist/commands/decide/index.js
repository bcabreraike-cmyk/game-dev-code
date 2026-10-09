"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decideCommand = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const path_1 = require("path");
exports.decideCommand = new commander_1.Command('decide')
    .description('Manage decisions/ADRs')
    .option('--accion <A>', 'action: new, list', 'list')
    .option('--titulo <T>', 'title for new ADR')
    .option('--contexto <C>', 'context for new ADR')
    .option('--opciones <O>', 'options as JSON string')
    .option('--decision <D>', 'decision text')
    .action(async (opts) => {
    const accion = opts.accion;
    const titulo = opts.titulo ?? undefined;
    const contexto = opts.contexto ?? undefined;
    const opciones = opts.opciones ?? undefined;
    const decision = opts.decision ?? undefined;
    console.log(`Decide action: ${accion}, titulo: ${titulo ?? 'none'}, contexto: ${contexto ?? 'none'}, opciones: ${opciones ?? 'none'}, decision: ${decision ?? 'none'}...`);
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
        method: 'ludo_decide',
        params: { accion, titulo, contexto, opciones, decision }
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
                    console.error(`Decide failed: ${resp.error.message}`);
                    process.exit(1);
                }
                else {
                    console.log(`Decide result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
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