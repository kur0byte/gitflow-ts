import { program } from 'commander';
import { execSync } from 'child_process';

program.version('1.0.0');

// Initialize Gitflow in the repository
program.command('init')
  .description('Initialize Gitflow in the repository')
  .action(() => {
    console.log('Initializing Gitflow...');
    execSync('git checkout -b develop', { stdio: 'inherit' });
    console.log('Switched to a new branch \'develop\'');
  });

// Start a new feature
program.command('feature <name>')
  .description('Start a new feature')
  .action((name) => {
    console.log(`Starting feature ${name}...`);
    execSync(`git checkout develop && git checkout -b feature/${name}`, { stdio: 'inherit' });
    console.log(`Switched to a new branch 'feature/${name}'`);
  });

// Finish a feature
program.command('finish-feature <name>')
  .description('Finish a feature and merge it into develop')
  .action((name) => {
    console.log(`Finishing feature ${name}...`);
    execSync(`git checkout develop && git merge feature/${name} && git branch -d feature/${name}`, { stdio: 'inherit' });
    console.log(`Feature ${name} finished and merged into develop`);
  });

// Start a new release
program.command('release <version>')
  .description('Start a new release')
  .action((version) => {
    console.log(`Starting release ${version}...`);
    execSync(`git checkout develop && git checkout -b release/${version}`, { stdio: 'inherit' });
    console.log(`Switched to a new branch 'release/${version}'`);
  });

// Finish a release
program.command('finish-release <version>')
  .description('Finish a release and merge it into main and develop')
  .action((version) => {
    console.log(`Finishing release ${version}...`);
    execSync(`git checkout main && git merge release/${version} && git tag -a ${version} -m 'Release ${version}' && git checkout develop && git merge release/${version} && git branch -d release/${version}`, { stdio: 'inherit' });
    console.log(`Release ${version} finished and merged into main and develop`);
  });

// Start a new hotfix
program.command('hotfix <version>')
  .description('Start a new hotfix')
  .action((version) => {
    console.log(`Starting hotfix ${version}...`);
    execSync(`git checkout main && git checkout -b hotfix/${version}`, { stdio: 'inherit' });
    console.log(`Switched to a new branch 'hotfix/${version}'`);
  });

// Finish a hotfix
program.command('finish-hotfix <version>')
  .description('Finish a hotfix and merge it into main and develop')
  .action((version) => {
    console.log(`Finishing hotfix ${version}...`);
    execSync(`git checkout main && git merge hotfix/${version} && git tag -a ${version} -m 'Hotfix ${version}' && git checkout develop && git merge hotfix/${version} && git branch -d hotfix/${version}`, { stdio: 'inherit' });
    console.log(`Hotfix ${version} finished and merged into main and develop`);
  });

program.parse(process.argv);

