interface IRemoteGit {
    createPullRequest(sourceBranch: string, targetBranch: string, title: string, description: string): Promise<void>;
}

export default IRemoteGit;