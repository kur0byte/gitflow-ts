// import { Container } from 'inversify';

// import { IRemoteGit, ILocalGit } from '../interfaces';

// import LocalGitRepository from './git/git.repository';
// import GithubBashRepository from './github/github_bash.repository';

// import { LocalGitService } from '../services';

// import { SERVICE_IDENTIFIER } from '../identifiers';
// // async function remoteHostFactory(host: remoteHosts){
// //   switch (host) {
// //     case 'git':
// //       console.log('git initialized')
// //       return new GitRepository()
// //     case 'github':
// //       console.log('github initialized')
// //       return new GithubManager();
// //     case 'gitlab':
// //         console.log('gitlab not implemented yet')
// //     //   return new GitLabManager();
// //     case 'bitbucket':
// //         console.log('bitbucket not implemented yet')
// //     //   return new BitBucketManager();
// //     default:
// //       throw new Error('Invalid remote host');
// //   }
// // }
// const container = new Container();
// switch (process.env.GIT_REMOTE_HOST) {
//   case 'github':
//     console.log('github initialized')
//     container.bind<IRemoteGit>(SERVICE_IDENTIFIER.GitRepository).to(GithubBashRepository);
//     break;
//   case 'gitlab':
//       console.log('gitlab not implemented yet')
//   //   return new GitLabManager();
//   case 'bitbucket':
//       console.log('bitbucket not implemented yet')
//   //   return new BitBucketManager();
//   default:
//     throw new Error('Invalid remote host');
//   }

// container.bind<ILocalGit>(SERVICE_IDENTIFIER.LocalGitRepository).to(LocalGitRepository);
// container.bind(SERVICE_IDENTIFIER.LocalGitService).to(LocalGitService);
