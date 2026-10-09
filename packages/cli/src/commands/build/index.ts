import { Command } from 'commander';
import { spawn } from 'child_process';
import { join } from 'path';

export const buildCommand = new Command('build')
  .description('Build the game for a target platform')
  .option('--target <T>', 'target platform (web, windows, macos, linux, android)', 'windows')
  .option('--profile <P>', 'build profile (debug, release)', 'debug')
  .action(async (opts) => {
    const target = opts.target;
    const profile = opts.profile;
    console.log(`Building for ${target} with profile ${profile}...`);
    // Spawn the MCP server and send a JSON-RPC request
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
      method: 'ludo_build',
      params: { target, profile }
    };
    server.stdin.write(JSON.stringify(request) + '\n');
    server.stdin.end();
    // Wait for the server to exit and parse response
    await new Promise<void>((resolve, reject) => {
      server.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`MCP server exited with code ${code}`));
          return;
        }
        // Try to parse the response (assuming single line JSON)
        try {
          const resp = JSON.parse(responseData.trim());
          if (resp.error) {
            console.error(`Build failed: ${resp.error.message}`);
            process.exit(1);
          } else {
            console.log(`Build result: ${JSON.stringify(resp.result ?? resp.data, null, 2)}`);
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
