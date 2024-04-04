import { ILocalGit, IRemoteGit } from "../interfaces";
import {container as DI, SERVICE_IDENTIFIER} from "../../di";
import inquirer, { PromptModule } from "inquirer"

class ReviewBaseFlow {
    remoteGit = DI.get<IRemoteGit>(SERVICE_IDENTIFIER.RemoteGitPluginService);
    git = DI.get<ILocalGit>(SERVICE_IDENTIFIER.LocalGitService);

    /**
     * Initializes the repository
     * @param opts The options for the repository
     */
    async initRepo(opts: any) {
        await this.git.initializeRepo()
    };
    
    /**
     * Starts a feature branch
     * @param {string} name The name of the feature branch
     */
    async startFeature (name: string){
        await this.git.switchBranch(`develop`)
        await this.git.createBranch(name, 'feature')
        await this.git.pushToRemote(`feature/${name}`, true)
    }
    
    /**
     * Finishes a feature and merges it into develop
     * @param {} opts The options for the feature
     * @param {string} title The title of the feature
     */
    async finishFeature (opts:any, title: string){
        const {owner='kur0byte', repo = 'gitflow-ts'} = opts
        const currentBranch = await this.git.getCurrentBranch()
        await this.remoteGit.createPullRequest(
            `feature/${title}`, 
            'develop', 
            `feature/${title}`,
            'description',
            owner, 
            repo
        );
    }
    
    /**
     * Starts a release branch
     * @param {string} version The version of the release
     */
    async startRelease (version: string){
        await this.git.switchBranch(`develop`)
        await this.git.createBranch(version, 'release')
        await this.git.pushToRemote(`release/${name}`, true)
    }
    
    /**
     * Finishes a release and merges it into main
     * @param opts The options for the release
     * @param {string} name The name of the release branch
     */
    async finishRelease (opts:any, name: string){
        const {description, owner, repo} = opts
        await this.remoteGit.createPullRequest(
            `release/${name}`, 
            'main', 
            name,
            description,
            owner,
            repo
        );
    }
     
    /**
     * Starts a hotfix branch
     * @param {string} name The name of the hotfix branch
     */
    async startHotfix(name: string){    
        await this.git.switchBranch(`develop`)
        await this.git.createBranch(name, 'hotfix')
        await this.git.pushToRemote(`hotfix/${name}`, true)
    }
    
    /**
     * Finishes a hotfix and merges it into main and develop
     * @param {string} version The version of the hotfix
     */
    async finishHotfix (version: string){
        // merge and push remote branch to main and develop
        await this.git.switchBranch('main')
        await this.git.mergeBranch(`hotfix/${version}`)
        await this.git.pushToRemote(`hotfix/${version}`)
        await this.git.switchBranch('develop')
        await this.git.mergeBranch(`hotfix/${version}`)
        await this.git.pushToRemote(`hotfix/${version}`)
    
        // deletes the hotfix branch
        await this.git.deleteBranch(`hotfix/${version}`)
    }
}

export default ReviewBaseFlow