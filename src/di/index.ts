import { Container } from 'inversify';
import { initializeRepositories, initializeServices } from "./inversify.config";
import { SERVICE_IDENTIFIER, REPOSITORY_IDENTIFIER } from './identifiers';

const container = new Container();

initializeRepositories(container, REPOSITORY_IDENTIFIER);
initializeServices(container, SERVICE_IDENTIFIER);

export {container, SERVICE_IDENTIFIER}