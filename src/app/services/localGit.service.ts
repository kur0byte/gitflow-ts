import { inject, injectable } from 'inversify';
import { ILocalGit } from '../interfaces';
import { REPOSITORY_IDENTIFIER } from '../di/identifiers';

@injectable()
class LocalGitService {
  constructor(
    @inject(REPOSITORY_IDENTIFIER.LocalGitRepository) private LocalGitRepository: ILocalGit
  ) {}

    async initializeRepo(): Promise<void> {
        await this.LocalGitRepository.initializeRepo()
    }

    async createBranch(name: string, type: string): Promise<void>{
      await this.LocalGitRepository.createBranch(name, type)
    }

    async deleteBranch(branchName: string): Promise<void> {
        await this.LocalGitRepository.deleteBranch(branchName)
    }

    async mergeBranch(mergingBranch: string): Promise<void> {
        await this.LocalGitRepository.mergeBranch(mergingBranch)
    }

    async pushToRemote(fromBranch: string, toBranch: string): Promise<void> {
        await this.LocalGitRepository.pushToRemote(fromBranch, toBranch)
    }

    async switchBranch(branch: string): Promise<void> {
        await this.LocalGitRepository.switchBranch(branch)
    }
}

export default LocalGitService;

