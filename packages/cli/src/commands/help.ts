import { Command } from 'commander';

export const helpCommand = new Command('help')
  .alias('h')
  .description('display help for command')
  .action(() => {
    // This is handled by the program's .help() method, but we can keep it for clarity
  });
