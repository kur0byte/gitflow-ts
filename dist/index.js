"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const child_process_1 = require("child_process");
commander_1.program.version('1.0.0');
// Initialize Gitflow in the repository
commander_1.program.command('init')
    .description('Initialize Gitflow in the repository')
    .action(() => {
    console.log('Initializing Gitflow...');
    (0, child_process_1.execSync)('git checkout -b develop', { stdio: 'inherit' });
    console.log('Switched to a new branch \'develop\'');
});
// Start a new feature
commander_1.program.command('feature <name>')
    .description('Start a new feature')
    .action((name) => {
    console.log(`Starting feature ${name}...`);
    (0, child_process_1.execSync)(`git checkout develop && git checkout -b feature/${name}`, { stdio: 'inherit' });
    console.log(`Switched to a new branch 'feature/${name}'`);
});
// Finish a feature
commander_1.program.command('finish-feature <name>')
    .description('Finish a feature and merge it into develop')
    .action((name) => {
    console.log(`Creating a pull request for feature '${name}' into 'develop'...`);
    (0, child_process_1.execSync)(`git checkout feature/${name} && git push origin feature/${name} && gh pr create --base develop --head feature/${name} --title "Merge feature: ${name}" --body "This PR integrates the completed feature '${name}' into the develop branch."`, { stdio: 'inherit' });
});
// Start a new release
commander_1.program.command('release <version>')
    .description('Start a new release')
    .action((version) => {
    console.log(`Starting release ${version}...`);
    (0, child_process_1.execSync)(`git checkout develop && git checkout -b release/${version}`, { stdio: 'inherit' });
    console.log(`Switched to a new branch 'release/${version}'`);
});
// Finish a release
commander_1.program.command('finish-release <version>')
    .description('Finish a release and merge it into main and develop')
    .action((version) => {
    console.log(`Creating a pull request for release '${version}' into 'main'...`);
    (0, child_process_1.execSync)(`git checkout release/${version} && git push origin release/${version} && gh pr create --base main --head release/${version} --title "Release version ${version}" --body "This PR releases version ${version} to production."`, { stdio: 'inherit' });
    console.log(`Remember to manually merge the release '${version}' into 'develop' after merging this PR to 'main'.`);
});
// Start a new hotfix
commander_1.program.command('hotfix <version>')
    .description('Start a new hotfix')
    .action((version) => {
    console.log(`Starting hotfix ${version}...`);
    (0, child_process_1.execSync)(`git checkout main && git checkout -b hotfix/${version}`, { stdio: 'inherit' });
    console.log(`Switched to a new branch 'hotfix/${version}'`);
});
// Finish a hotfix
commander_1.program.command('finish-hotfix <version>')
    .description('Finish a hotfix and merge it into main and develop')
    .action((version) => {
    console.log(`Creating a pull request for hotfix '${version}' into 'main'...`);
    (0, child_process_1.execSync)(`git checkout hotfix/${version} && git push origin hotfix/${version} && gh pr create --base main --head hotfix/${version} --title "Hotfix ${version}" --body "This PR applies hotfix '${version}' to production."`, { stdio: 'inherit' });
    console.log(`Remember to manually merge the hotfix '${version}' into 'develop' after merging this PR to 'main'.`);
});
commander_1.program.parse(process.argv);
