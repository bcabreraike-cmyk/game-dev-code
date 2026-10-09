import { Command } from 'commander';

export const scopeCommand = new Command('scope')
  .description('Command for scope')
  .action(async () => {
    console.log(`The scope command is not yet implemented.`);
  });
