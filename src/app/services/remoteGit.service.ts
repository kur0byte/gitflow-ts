import { inject, injectable } from "inversify";
import { REPOSITORY_IDENTIFIER } from "../di/identifiers";
import { IRemoteGit } from "../interfaces";

@injectable()
class RemoteGitService {
    constructor(
        @inject(REPOSITORY_IDENTIFIER.RemoteGitRepository) private remoteGitRepository: IRemoteGit
    ){}

    async createPullRequest(
        name: string, 
        base: string, 
        head: string, 
        description: string
    ): Promise<void> {
        await this.remoteGitRepository.createPullRequest(name, base, head, description)
    }
}

export default RemoteGitService;