import { Command } from 'commander';
import { spawn } from 'child_process';
import { join } from 'path';

export const answerCommand = new Command('answer')
  .description('Answer a question')
  .argument('<pregunta-id>', 'question ID')
  .argument('<respuesta>', 'answer text')
  .action(async (preguntaId, respuesta) => {
    console.log(`Answering question ${preguntaId} with: ${respuesta}...`);
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
      method: 'ludo_answer',
      params: { pregunta_id: preguntaId, respuesta }
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
            console.error(`Answer failed: ${resp.error.message}`);
            process.exit(1);
          } else {
            console.log(`Answer result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
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
