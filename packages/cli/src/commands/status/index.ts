import { Command } from 'commander';
import { spawn } from 'child_process';
import { join } from 'path';

export const statusCommand = new Command('status')
  .description('Get the current status of the Ludoforge project')
  .option('--json', 'output in JSON format', false)
  .action(async (opts) => {
    const jsonOutput = opts.json;
    console.log(`Getting Ludoforge status...`);
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
      method: 'ludo_status',
      params: {}
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
            console.error(`Status failed: ${resp.error.message}`);
            process.exit(1);
          } else {
            if (jsonOutput) {
              console.log(JSON.stringify(resp.result ?? resp.data, null, 2));
            } else {
              // Pretty print the status for human readability
              const data = resp.result ?? resp.data;
              console.log(`Etapa / versión: ${data.etapa} / ${data.version}`);
              console.log('');
              console.log(`Resumen:`);
              console.log(`- Tareas totales: ${data.tareas.total}`);
              console.log(`- Tareas completadas: ${data.tareas.done}`);
              console.log(`- Preguntas totales: ${data.preguntas.total}`);
              console.log(`- Preguntas respondidas: ${data.preguntas.answered}`);
              console.log(`- Presupuesto consumido: ${JSON.stringify(data.presupuesto)}`);
            }
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
