import { inject, injectable } from "inversify";
import { IRemoteGit } from "../../core/interfaces";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "../../../config";

export const BASE_URL = Symbol("BASE_URL");

@injectable()
export default class GithubRestRepository implements IRemoteGit{
    private httpClient: AxiosInstance
    
    constructor(@inject(BASE_URL) baseUrl: string) {
        this.httpClient = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${config.plugins.github.apiToken}`,
                'X-GitHub-Api-Version': '2022-11-28'
            },
        });
    }

    async listBranches(
        owner: string,
        repo: string
    ) {
        try {
            const url = `/repos/${owner}/${repo}/branches`
            const response: AxiosResponse = await this.httpClient.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createPullRequest(
        sourceBranch: string, 
        targetBranch: string, 
        title: string, 
        description: string, 
        owner: string, 
        repo: string
    ): Promise<any>
    {
        const url: string = `/repos/${owner}/${repo}/pulls`
        const body = {
            title: title,
            body: description,
            head: sourceBranch,
            base: targetBranch,
        }
        try{
            const res = await this.httpClient.post(url, body)

            if (res.status === 403) {
                throw 'Error 403: Forbidden'
            }

            if (res.status === 422) {
                throw 'Error 422: Unprocessable Entity'
            }

            if (res.status === 201) {
                console.log('Pull request created')
            }
            return null
        } catch (error) {
            console.error(error)
            return null
        }


    }
}


