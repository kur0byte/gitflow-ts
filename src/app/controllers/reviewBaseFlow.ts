import { ILocalGit, IRemoteGit } from "../interfaces";
import {container as DI, SERVICE_IDENTIFIER} from "../di";

class ReviewBaseFlow {
    git = DI.get<ILocalGit>(SERVICE_IDENTIFIER.LocalGitService);
    remoteGit = DI.get<IRemoteGit>(SERVICE_IDENTIFIER.RemoteGitService);

    async initRepo(opts: any) {
        await this.git.initializeRepo()
    };
    
    async startFeature (name: string){
        await this.git.switchBranch('develop')
        await this.git.createBranch(name, 'feature')
        await this.git.pushToRemote(name, `feature/${name}`)
    }
    
    async finishFeature (opts:any, name: string){
        const {description, repoManager} = opts
        // TODO: fetch the remote branches created by the user
        // TODO:input an option list with available branches to pr
        await this.remoteGit.createPullRequest(
            name, 
            'develop', 
            name,
            description
        );
    }
    
    async startRelease (name: string){
        await this.git.createBranch(name, 'release')
        await this.git.pushToRemote(name, `release/${name}`)
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
        await this.git.createBranch(name, 'hotfix')
        await this.git.pushToRemote(name, `hotfix/${name}`)
    }
    
    async finishHotfix (name: string, version: string){
        await this.git.pushToRemote(name, `hotfix/${name}`)
        
        // merge and push remote branch to main and develop
        await this.git.switchBranch('main')
        await this.git.mergeBranch(`hotfix/${name}`)
        await this.git.switchBranch('develop')
        await this.git.mergeBranch(`hotfix/${name}`)
    
        // deletes the hotfix branch
        await this.git.deleteBranch(`hotfix/${name}`)
    }
}

export default ReviewBaseFlow