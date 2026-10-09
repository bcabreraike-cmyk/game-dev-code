import { Command } from 'commander';

export const rolesCommand = new Command('roles')
  .description('Command for roles')
  .action(async () => {
    console.log(`The roles command is not yet implemented.`);
  });
