import { Command } from 'commander';

export const releaseCommand = new Command('release')
  .description('Command for release')
  .action(async () => {
    console.log(`The release command is not yet implemented.`);
  });
