import { Command } from 'commander';

export const newCommand = new Command('new')
  .description('Command for new')
  .action(async () => {
    console.log(`The new command is not yet implemented.`);
  });
