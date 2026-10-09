import { Command } from 'commander';

export const blueprintsCommand = new Command('blueprints')
  .description('Command for blueprints')
  .action(async () => {
    console.log(`The blueprints command is not yet implemented.`);
  });
