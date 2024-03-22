import { ILocalGit, IRemoteGit } from "../interfaces";
import {container as DI, SERVICE_IDENTIFIER} from "../di";

class ReviewBaseFlow {
    git = DI.get<ILocalGit>(SERVICE_IDENTIFIER.LocalGitService);
    remoteGit = DI.get<IRemoteGit>(SERVICE_IDENTIFIER.RemoteGitService);

    async initRepo(opts: any) {
        await this.git.initializeRepo()
    };
    
    async startFeature (name: string){
        await this.git.switchBranch(`develop`)
        await this.git.createBranch(name, 'feature')
        await this.git.pushToRemote(`feature/${name}`, true)
    }
    
    async finishFeature (opts:any, name: string){
        const {description, repoManager} = opts
        await this.remoteGit.createPullRequest(
            `feature/${name}`, 
            'develop', 
            name,
            description
        );
    }
    
    async startRelease (name: string){
        await this.git.switchBranch(`develop`)
        await this.git.createBranch(name, 'release')
        await this.git.pushToRemote(`release/${name}`, true)
    }
    
    async finishRelease (opts:any, name: string){
        const {description, repoManager} = opts
        await this.remoteGit.createPullRequest(
            name, 
            'main', 
            name,
            description
        );
    }
        
    async startHotfix(name: string){    
        await this.git.switchBranch(`develop`)
        await this.git.createBranch(name, 'hotfix')
        await this.git.pushToRemote(`hotfix/${name}`, true)
    }
    
    async finishHotfix (name: string, version: string){
        // merge and push remote branch to main and develop
        await this.git.switchBranch('main')
        await this.git.mergeBranch(`hotfix/${name}`)
        await this.git.pushToRemote(`hotfix/${name}`)
        await this.git.switchBranch('develop')
        await this.git.mergeBranch(`hotfix/${name}`)
        await this.git.pushToRemote(`hotfix/${name}`)
    
        // deletes the hotfix branch
        await this.git.deleteBranch(`hotfix/${name}`)
    }
}

export default ReviewBaseFlow