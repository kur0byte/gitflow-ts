import 'dotenv/config';
export const config = {
    gitRemoteHost: process.env.GIT_REMOTE_HOST || 'github',
}