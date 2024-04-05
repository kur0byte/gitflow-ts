import { config } from '../../config';
import { Container } from 'inversify';

import { ILocalGit, IRemoteGit } from '../core/interfaces';

import LocalGitRepository from '../core/git/git.repository';
import { GithubRestRepository, BASE_URL } from '../plugins/github';

import LocalGitService from '../core/git/localGit.service';
import {RemoteGitPluginService} from '../core/pluginManagers';

export function initializeRepositories(container: Container, identifiers:any) {
  // Remote Git Host Factory
  switch (config.gitRemoteHost) {
    case 'github':
      container.bind(BASE_URL).toConstantValue("https://api.github.com");
      container.bind<IRemoteGit>(identifiers.RemoteGitRepository).to(GithubRestRepository)
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
  container.bind<IRemoteGit>(identifiers.RemoteGitPluginService).to(RemoteGitPluginService)
}

