import { inject, injectable } from "inversify";
import { SERVICE_IDENTIFIER } from "../identifiers";
import { IRemoteGit } from "../interfaces";

@injectable()
class RemoteGitService {
    constructor(
        @inject(SERVICE_IDENTIFIER.RemoteGitRepository) private remoteGitRepository: IRemoteGit
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