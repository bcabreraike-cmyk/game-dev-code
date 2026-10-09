import { Command } from 'commander';

export const explainCommand = new Command('explain')
  .description('Command for explain')
  .action(async () => {
    console.log(`The explain command is not yet implemented.`);
  });
