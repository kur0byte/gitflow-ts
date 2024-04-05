import { Command } from '@commander-js/extra-typings';
import { config } from '../../config';
import fs from 'fs';
import path from 'path';
import { envUpdateHandler } from '../utils/envUpdate.handler';

const program = new Command();

program
  .version('1.0.0')
  .option('-r, --repoManager <type>', 'Specify the repository manager', config.gitRemoteHost)
  .option('-o, --repoOwner <type>', 'Specify the repository owner', config.repoOwner)
  .option('-n, --repoName <type>', 'Specify the repository name', config.repoName)

program.on('option:repoManager', (opts = program.opts()) => {
  envUpdateHandler('REPO_MANAGER', opts);
})

program.on('option:repoOwner', (opts = program.opts()) => {
  envUpdateHandler('REPO_OWNER', opts);
})

program.on('option:repoName', (opts = program.opts()) => {
  envUpdateHandler('REPO_NAME', opts);
})

// program.parse(process.argv);

export default program