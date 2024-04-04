import 'dotenv/config';
export const config = {
    gitRemoteHost: process.env.GIT_REMOTE_HOST || 'github',
    plugins: {
        github: {
            apiToken: process.env.GITHUB_TOKEN || null,
        }

    }
}