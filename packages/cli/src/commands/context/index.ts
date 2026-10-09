import { Command } from 'commander';

export const contextCommand = new Command('context')
  .description('Command for context')
  .action(async () => {
    console.log(`The context command is not yet implemented.`);
  });
