import { injectable } from "inversify";
import { asyncExec } from "../../utils";
import {IRemoteGit} from "../../interfaces";
import { parseCommand } from "../../utils/commandParser.handler";

@injectable()
class GithubBashRepository implements IRemoteGit {
  async createPullRequest(sourceBranch: string, targetBranch: string, title: string, description: string): Promise<void> {
    const flags = {
      base: targetBranch,
      head: sourceBranch,
      title: title,
      body: description
    }
    const command = `gh pr create --base "${flags.base}" --head "${flags.head}" --title "${flags.title}" --body "${flags.body}`;
    // const command = parseCommand(`echo pr create`, flags);
    await this.executeAndLogSuccess(command);
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

export default GithubBashRepository;