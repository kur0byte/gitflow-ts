interface ILocalGit {
  initializeRepo(): Promise<void>;
  deleteBranch(branchName: string): Promise<void>;
  switchBranch(branch: string): Promise<void>;
  mergeBranch(mergingBranch: string): Promise<void>;
  pushToRemote(fromBranch: string, toBranch: string): Promise<void>;
  createBranch(name: string, type: string): Promise<void>;
  logError(error: string): void;
  logSuccess(message: string): void
  executeAndLogSuccess(command: string): Promise<void>
}
export default ILocalGit;
  