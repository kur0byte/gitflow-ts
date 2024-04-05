import { inject, injectable } from "inversify";
import { IRemoteGit } from "../interfaces";
import { REPOSITORY_IDENTIFIER } from "../../di/identifiers";

@injectable()
export default class RemoteGitPluginService implements IRemoteGit{
    constructor(
        @inject(REPOSITORY_IDENTIFIER.RemoteGitRepository) private remoteGitRepository: IRemoteGit
    ){}
    
    async listBranches(
        owner: string,
        repo: string
    ) {
        return await this.remoteGitRepository.listBranches(owner, repo)
    }

    async createPullRequest(
        sourceBranch: string, 
        targetBranch: string, 
        title: string, 
        description: string, 
        owner: string, 
        repo: string
    ): Promise<void> {
        await this.remoteGitRepository.createPullRequest(sourceBranch, targetBranch, title, description, owner, repo)
    }
}