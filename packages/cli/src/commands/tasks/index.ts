import { Command } from 'commander';

export const tasksCommand = new Command('tasks')
  .description('Command for tasks')
  .action(async () => {
    console.log(`The tasks command is not yet implemented.`);
  });
