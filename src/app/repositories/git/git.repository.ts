import {ILocalGit} from '../../interfaces';
import { injectable } from "inversify";
import { asyncExec } from "../../utils";

@injectable()
class LocalGitRepository implements ILocalGit {
  async initializeRepo(): Promise<void> {
    // const command = 'git init'
    // const command = `echo "git repo initialized"`
    const command = `git checkout -b "testtest"`
    await asyncExec(command);
    // await this.executeAndLogSuccess(command)
  }

  async deleteBranch(branchName: string): Promise<void> {
    const command = `git branch -D ${branchName}`
    // const command = `echo "deleted branch: ${branchName}"`
    await asyncExec(command);
    // await this.executeAndLogSuccess(command);
  }

  async switchBranch(branch: string): Promise<void> {
    const command = `git checkout ${branch}`
    // const command = `echo "switched to ${branch}"`
    await asyncExec(command);
    // await this.executeAndLogSuccess(command);
  }

  async mergeBranch(mergingBranch: string): Promise<void> {
    const command = `git merge ${mergingBranch}`
    // const command = `echo "merged ${mergingBranch}"`
    await asyncExec(command);
    // await this.executeAndLogSuccess(command);
  }

  async pushToRemote(toBranch: string, upStream: boolean = false): Promise<void> {
    // const command = `git push origin ${toBranch}`
    const command = `git push ${upStream ? '--set-upstream' : ''} origin ${toBranch}`
    // const command = `echo "pushed from origin to ${toBranch}"`;
    await asyncExec(command);
    // await this.executeAndLogSuccess(command);   
  }
  
  async createBranch(name:string, type:string) {
    const command = `git checkout -b ${type}/${name}`;
    // const command = `echo "${type} branch created: ${type}/${name}"`;
    await asyncExec(command);
    // await this.executeAndLogSuccess(command);
  }

  logSuccess(message: string): void {
    console.log(`Success: ${message}`);
  }
  
  logError(error: string): void {
    console.error(`Error: ${error}`);
  }
    
  async executeAndLogSuccess(command: string): Promise<void> {
    try {
        await asyncExec(command);
        this.logSuccess(`Command "${command}" executed successfully.`);
    } catch (error) {
        this.logError(`Command "${command}" failed with error: ${error}`);
    }
  }
}

export default LocalGitRepository;