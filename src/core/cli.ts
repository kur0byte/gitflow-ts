import { Command } from '@commander-js/extra-typings';
import { config } from '../config';
const program = new Command();

program
  .version('1.0.0')
  .option('-r, --repoManager <type>', 'Specify the repository manager', config.gitRemoteHost)
  .option('-v, --verbose', 'output extra debugging')
  .option('-s, --silent', 'do not output any message')
  // .option('-c, --config <type>', 'set config type (default: "default")')
  .option('-d, --dry-run', 'show what would have been done without actually doing it');

program.on('option:verbose', function () {
  process.env.DEBUG = 'true';
});

program.on('option:silent', function () {
  process.env.SILENT = 'true';
});

program.on('option:dry-run', function () {
  process.env.DRY_RUN = 'true';
});

program.parse(process.argv);

export default program