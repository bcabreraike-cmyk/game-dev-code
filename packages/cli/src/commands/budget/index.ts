import { Command } from 'commander';

export const budgetCommand = new Command('budget')
  .description('Command for budget')
  .action(async () => {
    console.log(`The budget command is not yet implemented.`);
  });
