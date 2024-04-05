interface ILocalGit {
  /**
   * Initializes the repository
   */
  initializeRepo(): any;

  /**
   * Deletes a branch from the repository
   * @param {string} branchName The name of the branch to delete
   */
  deleteBranch(branchName: string): any;

  /**
   * Switches to a branch in the repository
   * @param {string} branch The name of the branch to switch to
   */
  switchBranch(branch: string): any;

  /**
   * Merges a branch into the current branch
   * @param {string} mergingBranch The name of the branch to merge
   */
  mergeBranch(mergingBranch: string): any;

  /**
   * Pushes a branch to a remote repository
   * @param {string} toBranch The name of the branch to push to
   * @param {boolean} upStream Whether to set the branch as the upstream branch
   */
  pushToRemote(toBranch: string, upStream?:boolean): any;

  /**
   * Creates a branch in the repository
   * @param {string} name The name of the branch to create
   * @param {string} type The type of branch to create
   */
  createBranch(name: string, type: string): any;

  /**
   * Get the current branch of the repository
   * @returns The current branch of the repository
   */
  getCurrentBranch(): any

  /**
   * Get the name of the repository
   * @returns The name of the repository
   */
  getRemoteRepoName(): any
}
export default ILocalGit;
  