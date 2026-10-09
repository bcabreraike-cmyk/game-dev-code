import { Command } from 'commander';
import { spawn } from 'child_process';
import { join } from 'path';

export const assetsCommand = new Command('assets')
  .description('Manage assets')
  .option('--accion <A>', 'action: list, generate, validate, approve, license-report', 'list')
  .option('--solicitud <S>', 'request as JSON string')
  .option('--ruta <R>', 'asset path')
  .action(async (opts) => {
    const accion = opts.accion;
    const solicitud = opts.solicitud ?? undefined;
    const ruta = opts.ruta ?? undefined;
    console.log(`Assets action: ${accion}, solicitud: ${solicitud ?? 'none'}, ruta: ${ruta ?? 'none'}...`);
const mcpServer = join(__dirname, '../../../../mcp-server/dist/index.js');
const server = spawn('node', [mcpServer], {
      stdio: ['pipe', 'pipe', 'inherit']
    });
    let responseData = '';
    server.stdout.on('data', (data) => {
      responseData += data.toString();
    });
    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'ludo_assets',
      params: { accion, solicitud, ruta }
    };
    server.stdin.write(JSON.stringify(request) + '\n');
    server.stdin.end();
    await new Promise<void>((resolve, reject) => {
      server.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`MCP server exited with code ${code}`));
          return;
        }
        try {
          const resp = JSON.parse(responseData.trim());
          if (resp.error) {
            console.error(`Assets failed: ${resp.error.message}`);
            process.exit(1);
          } else {
            console.log(`Assets result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
          }
        } catch (e) {
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
