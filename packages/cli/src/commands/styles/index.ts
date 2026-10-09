import { Command } from 'commander';

export const stylesCommand = new Command('styles')
  .description('Command for styles')
  .action(async () => {
    console.log(`The styles command is not yet implemented.`);
  });
