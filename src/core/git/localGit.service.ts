import { inject, injectable } from 'inversify';
import { ILocalGit } from '../interfaces';
import { REPOSITORY_IDENTIFIER } from '../../di/identifiers';

@injectable()
export default class LocalGitService {
  constructor(
    @inject(REPOSITORY_IDENTIFIER.LocalGitRepository) private LocalGitRepository: ILocalGit
  ) {}

    async getCurrentBranch(): Promise<string> {
        return await this.LocalGitRepository.getCurrentBranch()
    }

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

    async pushToRemote(toBranch: string): Promise<void> {
        await this.LocalGitRepository.pushToRemote(toBranch)
    }

    async switchBranch(branch: string): Promise<void> {
        await this.LocalGitRepository.switchBranch(branch)
    }
}