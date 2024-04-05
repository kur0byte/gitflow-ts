export default interface IRemoteGit {
    listBranches(owner: string, repo: string): Promise<string[]>;
    createPullRequest(
        sourceBranch: string, 
        targetBranch: string, 
        title: string, 
        description: string, 
        owner: string, 
        repo: string
    ): Promise<void>;
}