import {ILocalGit} from '../interfaces';
import { injectable } from "inversify";
import { syncExec } from '../../utils/asyncExec.handler';

@injectable()
export default class LocalGitRepository implements ILocalGit {
  initializeRepo() {
    const command = 'git init'
    const successMsg = 'Repository initialized successfully';
    const errorMsg = 'Error initializing repository';
    return syncExec(command, successMsg, errorMsg);
  }

  getCurrentBranch() {
    const command = 'git branch --show-current'
    const successMsg = 'Current branch retrieved successfully';
    const errorMsg = 'Error retrieving current branch';
    const currBranch = syncExec(command, successMsg, errorMsg).trim()
    console.log(currBranch)
    return currBranch;
  }

  deleteBranch(branchName: string){
    const command = `git branch -D ${branchName}`
    const successMsg = `Branch ${branchName} deleted successfully`;
    const errorMsg = `Error deleting branch ${branchName}`;
    return syncExec(command, successMsg, errorMsg);
  }

  switchBranch(branch: string) {
    const command = `git checkout ${branch}`
    const successMsg = `Switched to branch ${branch} successfully`;
    const errorMsg = `Error switching to branch ${branch}`;
    return syncExec(command, successMsg, errorMsg);
  }

  mergeBranch(mergingBranch: string) {
    const command = `git merge ${mergingBranch}`
    const successMsg = `Branch ${mergingBranch} merged successfully`;
    const errorMsg = `Error merging branch ${mergingBranch}`;
    return syncExec(command, successMsg, errorMsg);
  }

  pushToRemote(toBranch: string, upStream: boolean = false) {
    const command = `git push ${upStream ? '--set-upstream' : ''} origin ${toBranch}`
    const successMsg = `Branch ${toBranch} pushed successfully`;
    const errorMsg = `Error pushing branch ${toBranch}`;
    return syncExec(command, successMsg, errorMsg);
  }
  
  createBranch(name:string, type:string) {
    const command = `git checkout -b ${type}/${name}`;
    const successMsg = `Branch ${name} created successfully`;
    const errorMsg = `Error creating branch ${name}`;
    return syncExec(command, successMsg, errorMsg);
  }

  getRemoteRepoName(){
    const command = 'git config --get remote.origin.url'
    const successMsg = 'Remote repository name retrieved successfully';
    const errorMsg = 'Error retrieving remote repository name';
    const url = syncExec(command, successMsg, errorMsg);
    const repoNameWithExtension = url.split('/').pop();
    const repoName = repoNameWithExtension?.split('.').shift();
    return repoName;
  }
}