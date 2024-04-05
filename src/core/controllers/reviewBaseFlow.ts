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
        this.git.switchBranch(config.branch.develop)
        this.git.createBranch(name, prefix)
        this.git.pushToRemote(`${prefix}/${name}`, true)
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
        // const currentBranch = await this.git.getCurrentBranch()
        const {title, description} = await featurePullRequestInputs(`${prefix}/${name}`)
        await this.remoteGit.createPullRequest(
            `${prefix}/${name}`, 
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
        this.git.switchBranch(config.branch.develop)
        this.git.createBranch(version, prefix)
        this.git.pushToRemote(`${prefix}/${version}`, true)
    }
    
    /**
     * Finishes a release and merges it into main
     * @param opts The options for the release
     * @param {string} name The name of the release branch
     */
    async finishRelease (opts:any, name: string){
        const {repoName, repoOwner} = config
        const prefix = config.prefixes.release
        const mainBranch = config.branch.main
        const {title, description} = await featurePullRequestInputs(`${prefix}/${name}`)
        await this.remoteGit.createPullRequest(
            `${prefix}/${name}`, 
            mainBranch, 
            title,
            description,
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
        this.git.switchBranch(config.branch.main)
        this.git.createBranch(name, prefix)
        this.git.pushToRemote(`${prefix}/${name}`, true)
    }
    
    /**
     * Finishes a hotfix and merges it into main and develop
     * @param {string} version The version of the hotfix
     */
    finishHotfix (version: string){
        const prefix = config.prefixes.hotfix
        const {develop, main} = config.branch

        // merge and push remote branch to main and develop
        this.git.switchBranch(main)
        this.git.mergeBranch(`${prefix}/${version}`)
        this.git.pushToRemote(`${prefix}/${version}`)
        this.git.switchBranch(develop)
        this.git.mergeBranch(`${prefix}/${version}`)
        this.git.pushToRemote(`${prefix}/${version}`)
    
        // deletes the hotfix branch
        this.git.deleteBranch(`${prefix}/${version}`)
    }
}

export default ReviewBaseFlow