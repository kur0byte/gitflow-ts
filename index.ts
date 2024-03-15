import program from './src/core/cli';
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
    console.log(`Creating a pull request for feature '${name}' into 'develop'...`);
    execSync(`git checkout feature/${name} && git push origin feature/${name} && gh pr create --base develop --head feature/${name} --title "Merge feature: ${name}" --body "This PR integrates the completed feature '${name}' into the develop branch."`, { stdio: 'inherit' });
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
    console.log(`Creating a pull request for release '${version}' into 'main'...`);
    execSync(`git checkout release/${version} && git push origin release/${version} && gh pr create --base main --head release/${version} --title "Release version ${version}" --body "This PR releases version ${version} to production."`, { stdio: 'inherit' });
    console.log(`Remember to manually merge the release '${version}' into 'develop' after merging this PR to 'main'.`);
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
    console.log(`Creating a pull request for hotfix '${version}' into 'main'...`);
    execSync(`git checkout hotfix/${version} && git push origin hotfix/${version} && gh pr create --base main --head hotfix/${version} --title "Hotfix ${version}" --body "This PR applies hotfix '${version}' to production."`, { stdio: 'inherit' });
    console.log(`Remember to manually merge the hotfix '${version}' into 'develop' after merging this PR to 'main'.`);
  });

program.parse(process.argv);

