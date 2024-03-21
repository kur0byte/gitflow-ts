#!/usr/bin/env npx ts-node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cli_1 = __importDefault(require("./src/core/cli"));
require("reflect-metadata");
const controllers_1 = require("./src/app/controllers");
// Initialize Gitflow in the repository
cli_1.default.command('init')
    .description('Initialize Gitflow in the repository')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const options = cli_1.default.opts();
    const controller = new controllers_1.ReviewBaseFlow();
    yield controller.initRepo(options);
}));
// Start a new feature
cli_1.default.command('feature <name>')
    .description('Start a new feature')
    .action((name) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new controllers_1.ReviewBaseFlow();
    yield controller.startFeature(name);
}));
// Finish a feature
cli_1.default.command('finish-feature <name>')
    .description('Finish a feature and merge it into develop')
    .action((name) => __awaiter(void 0, void 0, void 0, function* () {
    const options = cli_1.default.opts();
    const controller = new controllers_1.ReviewBaseFlow();
    yield controller.finishFeature(options, name);
}));
// Start a new release
cli_1.default.command('release <version>')
    .description('Start a new release')
    .action((version) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new controllers_1.ReviewBaseFlow();
    yield controller.startRelease(version);
}));
// Finish a release
cli_1.default.command('finish-release <version>')
    .description('Finish a release and merge it into master')
    .action((version) => __awaiter(void 0, void 0, void 0, function* () {
    const options = cli_1.default.opts();
    const controller = new controllers_1.ReviewBaseFlow();
    yield controller.finishRelease(options, version);
}));
// Start a new hotfix
cli_1.default.command('hotfix <version>')
    .description('Start a new hotfix')
    .action((version) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new controllers_1.ReviewBaseFlow();
    yield controller.startHotfix(version);
}));
// Finish a hotfix
cli_1.default.command('finish-hotfix <name> <version>')
    .description('Finish a hotfix and merge it into master')
    .action((name, version) => __awaiter(void 0, void 0, void 0, function* () {
    const options = cli_1.default.opts();
    const controller = new controllers_1.ReviewBaseFlow();
    yield controller.finishHotfix(name, version);
}));
cli_1.default.parse(process.argv);
