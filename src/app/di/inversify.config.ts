import { Container } from 'inversify';
import { REPOSITORY_IDENTIFIER, SERVICE_IDENTIFIER } from './identifiers';

import { ILocalGit, IRemoteGit } from '../interfaces';

import LocalGitRepository from '../repositories/git/git.repository';
import GithubBashRepository from '../repositories/github/github_bash.repository';

import { LocalGitService, RemoteGitService } from '../services';
import { config } from '../../config';

export function initializeRepositories(container: Container, identifiers:any) {
  // Remote Git Host Factory
  switch (config.gitRemoteHost) {
    case 'github':
      container.bind<IRemoteGit>(identifiers.RemoteGitRepository).to(GithubBashRepository);
      break;
    case 'gitlab':
        console.log('gitlab not implemented yet')
        // container.bind<IRemoteGit>(SERVICE_IDENTIFIER.RemoteGitRepository).to(GitlabBashRepository);
    case 'bitbucket':
        console.log('bitbucket not implemented yet')
        // container.bind<IRemoteGit>(SERVICE_IDENTIFIER.RemoteGitRepository).to(BitbucketBashRepository);
    default:
      throw new Error('Invalid remote host');
    }
  
  container.bind<ILocalGit>(identifiers.LocalGitRepository).to(LocalGitRepository);
}

export function initializeServices(container: Container, identifiers: any) {
  container.bind(identifiers.LocalGitService).to(LocalGitService)
  container.bind(identifiers.RemoteGitService).to(RemoteGitService)
}

