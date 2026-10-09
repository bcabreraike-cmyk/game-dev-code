import { Command } from 'commander';

export const versionCommand = new Command('version')
  .alias('v')
  .description('output the current version')
  .action(() => {
    console.log('0.0.0-inicial');
  });
