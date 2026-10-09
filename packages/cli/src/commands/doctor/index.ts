import { Command } from 'commander';

export const doctorCommand = new Command('doctor')
  .description('Command for doctor')
  .action(async () => {
    console.log(`The doctor command is not yet implemented.`);
  });
