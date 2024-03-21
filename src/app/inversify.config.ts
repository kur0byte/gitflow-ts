import { Container } from 'inversify';
import { SERVICE_IDENTIFIER } from './identifiers';

import { ILocalGit, IRemoteGit } from './interfaces';

import LocalGitRepository from './repositories/git/git.repository';
import GithubBashRepository from './repositories/github/github_bash.repository';

import { LocalGitService, RemoteGitService } from './services';

const container = new Container();
// REPOSITORIES

// Remote Git Host Factory
switch (process.env.GIT_REMOTE_HOST) {
  case 'github':
  console.log('github initialized')
    container.bind<IRemoteGit>(SERVICE_IDENTIFIER.RemoteGitRepository).to(GithubBashRepository);
    break;
  case 'gitlab':
      console.log('gitlab not implemented yet')
  //   return new GitLabManager();
  case 'bitbucket':
      console.log('bitbucket not implemented yet')
  //   return new BitBucketManager();
  default:
    throw new Error('Invalid remote host');
  }

container.bind<ILocalGit>(SERVICE_IDENTIFIER.LocalGitRepository).to(LocalGitRepository);

// SERVICES
container.bind(SERVICE_IDENTIFIER.LocalGitService).to(LocalGitService)
container.bind(SERVICE_IDENTIFIER.RemoteGitService).to(RemoteGitService)

export default container;