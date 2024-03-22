#!/usr/bin/env npx ts-node

import program from './src/core/cli';
import 'reflect-metadata';
import { ReviewBaseFlow } from './src/app/controllers';

// Initialize Gitflow in the repository
program.command('init')
.description('Initialize Gitflow in the repository')
.action(async () => {
  const options:any = program.opts()
  const controller = new ReviewBaseFlow()
  await controller.initRepo(options)
});
  
// Start a new feature
program.command('feature <name>')
  .description('Start a new feature')
  .action(async (name: any) => {
    const controller = new ReviewBaseFlow()
    await controller.startFeature(name)
  });

// Finish a feature
program.command('finish-feature <name>')
  .description('Finish a feature and merge it into develop')
  .option('-d, --description <description>', 'Description of the feature')
  .action(async (name: any) => {
    const options: any = program.opts()
    const controller = new ReviewBaseFlow()
    await controller.finishFeature(options, name)
});

// Start a new release
program.command('release <version>')
  .description('Start a new release')
  .action(async (version: any) => {
    const controller = new ReviewBaseFlow()
    await controller.startRelease(version)
  });

// Finish a release
program.command('finish-release <version>')
  .description('Finish a release and merge it into master')
  .action(async (version: any) => {
    const options: any = program.opts()
    const controller = new ReviewBaseFlow()
    await controller.finishRelease(options, version)
});

// Start a new hotfix
program.command('hotfix <version>')
  .description('Start a new hotfix')
  .action(async (version: any) => {
    const controller = new ReviewBaseFlow()
    await controller.startHotfix(version)
  });

// Finish a hotfix
program.command('finish-hotfix <name> <version>')
  .description('Finish a hotfix and merge it into master')
  .action(async (name: string, version: string) => {
    const options: any = program.opts()
    const controller = new ReviewBaseFlow()
    await controller.finishHotfix(name, version)
});

program.parse(process.argv);