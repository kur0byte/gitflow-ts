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
    console.log(`Finishing feature ${name}...`);
    (0, child_process_1.execSync)(`git checkout develop && git merge feature/${name} && git branch -d feature/${name} && git push origin develop`, { stdio: 'inherit' });
    console.log(`Feature ${name} finished and merged into develop`);
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
    console.log(`Finishing release ${version}...`);
    (0, child_process_1.execSync)(`git checkout main && git merge release/${version} && git tag -a ${version} -m 'Release ${version}' && git push origin main && git checkout develop && git merge release/${version} && git branch -d release/${version} && git push origin develop && git push --tags`, { stdio: 'inherit' });
    console.log(`Release ${version} finished and merged into main and develop`);
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
    console.log(`Finishing hotfix ${version}...`);
    (0, child_process_1.execSync)(`git checkout main && git merge hotfix/${version} && git tag -a ${version} -m 'Hotfix ${version}' && git push origin main && git checkout develop && git merge hotfix/${version} && git branch -d hotfix/${version} && git push origin develop && git push --tags`, { stdio: 'inherit' });
    console.log(`Hotfix ${version} finished and merged into main and develop`);
});
commander_1.program.parse(process.argv);
