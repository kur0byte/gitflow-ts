"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var child_process_1 = require("child_process");
commander_1.program.version('1.0.0');
// Initialize Gitflow in the repository
commander_1.program.command('init')
    .description('Initialize Gitflow in the repository')
    .action(function () {
    console.log('Initializing Gitflow...');
    (0, child_process_1.execSync)('git checkout -b develop', { stdio: 'inherit' });
    console.log('Switched to a new branch \'develop\'');
});
// Start a new feature
commander_1.program.command('feature <name>')
    .description('Start a new feature')
    .action(function (name) {
    console.log("Starting feature ".concat(name, "..."));
    (0, child_process_1.execSync)("git checkout develop && git checkout -b feature/".concat(name), { stdio: 'inherit' });
    console.log("Switched to a new branch 'feature/".concat(name, "'"));
});
// Finish a feature
commander_1.program.command('finish-feature <name>')
    .description('Finish a feature and merge it into develop')
    .action(function (name) {
    console.log("Finishing feature ".concat(name, "..."));
    (0, child_process_1.execSync)("git checkout develop && git merge feature/".concat(name, " && git branch -d feature/").concat(name), { stdio: 'inherit' });
    console.log("Feature ".concat(name, " finished and merged into develop"));
});
// Start a new release
commander_1.program.command('release <version>')
    .description('Start a new release')
    .action(function (version) {
    console.log("Starting release ".concat(version, "..."));
    (0, child_process_1.execSync)("git checkout develop && git checkout -b release/".concat(version), { stdio: 'inherit' });
    console.log("Switched to a new branch 'release/".concat(version, "'"));
});
// Finish a release
commander_1.program.command('finish-release <version>')
    .description('Finish a release and merge it into main and develop')
    .action(function (version) {
    console.log("Finishing release ".concat(version, "..."));
    (0, child_process_1.execSync)("git checkout main && git merge release/".concat(version, " && git tag -a ").concat(version, " -m 'Release ").concat(version, "' && git checkout develop && git merge release/").concat(version, " && git branch -d release/").concat(version), { stdio: 'inherit' });
    console.log("Release ".concat(version, " finished and merged into main and develop"));
});
// Start a new hotfix
commander_1.program.command('hotfix <version>')
    .description('Start a new hotfix')
    .action(function (version) {
    console.log("Starting hotfix ".concat(version, "..."));
    (0, child_process_1.execSync)("git checkout main && git checkout -b hotfix/".concat(version), { stdio: 'inherit' });
    console.log("Switched to a new branch 'hotfix/".concat(version, "'"));
});
// Finish a hotfix
commander_1.program.command('finish-hotfix <version>')
    .description('Finish a hotfix and merge it into main and develop')
    .action(function (version) {
    console.log("Finishing hotfix ".concat(version, "..."));
    (0, child_process_1.execSync)("git checkout main && git merge hotfix/".concat(version, " && git tag -a ").concat(version, " -m 'Hotfix ").concat(version, "' && git checkout develop && git merge hotfix/").concat(version, " && git branch -d hotfix/").concat(version), { stdio: 'inherit' });
    console.log("Hotfix ".concat(version, " finished and merged into main and develop"));
});
commander_1.program.parse(process.argv);
