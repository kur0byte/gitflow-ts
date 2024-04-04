import axios, { AxiosInstance } from "axios";
import { SERVICE_IDENTIFIER, container as DI } from "../../di";
import { injectable } from "inversify";

@injectable()
export default class ShortcutRestRepository {
    private httpClient: AxiosInstance;
    
    constructor(baseUrl: string) {
        this.httpClient = axios.create({
            baseURL: baseUrl,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }

    async updateStory(url: string, data: any) {
        try {
            const response = await this.httpClient.post(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}