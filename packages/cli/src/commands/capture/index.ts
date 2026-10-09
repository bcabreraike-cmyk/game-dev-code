import { Command } from 'commander';
import { spawn } from 'child_process';
import { join } from 'path';

export const captureCommand = new Command('capture')
  .description('Capture screenshot or video')
  .option('--escenario <E>', 'scenario type: screenshot or video', 'screenshot')
  .option('--nombre <N>', 'name for the capture file', '')
  .action(async (opts) => {
    const escenario = opts.escenario;
    const nombre = opts.nombre ?? undefined;
    console.log(`Capturing ${escenario} (name: ${nombre ?? 'default'})...`);
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
      method: 'ludo_capture',
      params: { escenario, nombre }
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
            console.error(`Capture failed: ${resp.error.message}`);
            process.exit(1);
          } else {
            console.log(`Capture result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
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
