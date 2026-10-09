import { Command } from 'commander';

export const modulesCommand = new Command('modules')
  .description('Command for modules')
  .action(async () => {
    console.log(`The modules command is not yet implemented.`);
  });
