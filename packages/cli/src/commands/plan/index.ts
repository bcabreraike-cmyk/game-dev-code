import { Command } from 'commander';

export const planCommand = new Command('plan')
  .description('Command for plan')
  .action(async () => {
    console.log(`The plan command is not yet implemented.`);
  });
