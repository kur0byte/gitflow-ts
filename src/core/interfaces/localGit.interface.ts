interface ILocalGit {
  initializeRepo(): Promise<void>;
  deleteBranch(branchName: string): Promise<void>;
  switchBranch(branch: string): Promise<void>;
  mergeBranch(mergingBranch: string): Promise<void>;
  pushToRemote(toBranch: string, upStream?:boolean): Promise<void>;
  createBranch(name: string, type: string): Promise<void>;
  logError(error: string): void;
  logSuccess(message: string): void
  executeAndLogSuccess(command: string): Promise<void>
  getCurrentBranch(): Promise<string>
}
export default ILocalGit;
  