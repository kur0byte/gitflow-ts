import { ILocalGit, IRemoteGit } from "../interfaces";
import {container as DI, SERVICE_IDENTIFIER} from "../../di";
import inquirer, { PromptModule } from "inquirer"
import { config } from "../../../config";
import { featurePullRequestInputs } from "../../utils/prFlow.handler";

class ReviewBaseFlow {
    remoteGit = DI.get<IRemoteGit>(SERVICE_IDENTIFIER.RemoteGitPluginService);
    git = DI.get<ILocalGit>(SERVICE_IDENTIFIER.LocalGitService);
    
    /**
     * Initializes the repository
     * @param opts The options for the repository
     */
    initRepo(opts: any) {
        this.git.initializeRepo()
    };
    
    /**
     * Starts a feature branch
     * @param {string} name The name of the feature branch
     */
    startFeature (name: string){
        const prefix = config.prefixes.feature
        const sourceBranchName = prefix ? `${prefix}/${name}` : name
        this.git.switchBranch(config.branch.develop)
        this.git.createBranch(name, prefix)
        this.git.pushToRemote(sourceBranchName, true)
    }
    
    /**
     * Finishes a feature and merges it into develop
     * @param {} opts The options for the feature
     * @param {string} title The title of the feature
     */
    async finishFeature (opts:any, name: string){
        const {repoName, repoOwner} = config
        const {develop} = config.branch
        const prefix = config.prefixes.feature
        const sourceBranchName = prefix ? `${prefix}/${name}` : name
        const {title, description} = await featurePullRequestInputs(sourceBranchName)
        await this.remoteGit.createPullRequest(
            sourceBranchName, 
            develop, 
            title,
            description,
            repoOwner, 
            repoName
        );
    }
    
    /**
     * Starts a release branch
     * @param {string} version The version of the release
     */
    startRelease (version: string){
        const prefix = config.prefixes.release
        const sourceBranchName = prefix ? `${prefix}/${version}` : version
        this.git.switchBranch(config.branch.develop)
        this.git.pull()
        this.git.createBranch(version, prefix)
        this.git.pull()
        this.git.pushToRemote(sourceBranchName, true)
    }
    
    /**
     * Finishes a release and merges it into main
     * @param opts The options for the release
     * @param {string} name The name of the release branch
     */
    async finishRelease (opts:any, version: string){
        const {repoName, repoOwner} = config
        const prefix = config.prefixes.release
        const sourceBranchName = prefix ? `${prefix}/${version}` : version
        const mainBranch = config.branch.main
        // const {title, description} = await featurePullRequestInputs(sourceBranchName)
        await this.remoteGit.createPullRequest(
            sourceBranchName, 
            mainBranch, 
            sourceBranchName,
            // TODO: add description
            'release description',
            repoOwner,
            repoName
        )
    }

    /**
     * Starts a hotfix branch
     * @param {string} name The name of the hotfix branch
     */
    startHotfix(name: string){    
        const prefix = config.prefixes.hotfix
        const sourceBranchName = prefix ? `${prefix}/${name}` : name
        this.git.switchBranch(config.branch.main)
        this.git.createBranch(name, prefix)
        this.git.pushToRemote(sourceBranchName, true)
    }
    
    /**
     * Finishes a hotfix and merges it into main and develop
     * @param {string} version The version of the hotfix
     */
    finishHotfix (version: string){
        const prefix = config.prefixes.hotfix
        const sourceBranchName = prefix ? `${prefix}/${version}` : version
        const {develop, main} = config.branch

        // merge and push remote branch to main and develop
        this.git.switchBranch(main)
        this.git.mergeBranch(sourceBranchName)
        this.git.pushToRemote(sourceBranchName)
        this.git.switchBranch(develop)
        this.git.mergeBranch(sourceBranchName)
        this.git.pushToRemote(sourceBranchName)
    
        // deletes the hotfix branch
        this.git.deleteBranch(sourceBranchName)
    }
}

export default ReviewBaseFlow