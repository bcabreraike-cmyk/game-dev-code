import { Command } from 'commander';

export const migrateCommand = new Command('migrate')
  .description('Command for migrate')
  .action(async () => {
    console.log(`The migrate command is not yet implemented.`);
  });
