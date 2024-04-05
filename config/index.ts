import 'dotenv/config';
export const config = {
    repoOwner: process.env.REPO_OWNER || '',
    repoName: process.env.REPO_NAME || '',
    branch: {
        main: process.env.MAIN_BRANCH || 'main',
        develop: process.env.DEVELOP_BRANCH || 'develop',
    },
    prefixes: {
        feature: process.env.FEATURE_PREFIX || 'feature',
        release: process.env.RELEASE_PREFIX || 'release',
        hotfix: process.env.HOTFIX_PREFIX || 'hotfix'
    },
    gitRemoteHost: process.env.GIT_REMOTE_HOST || 'github',
    plugins: {
        github: {
            apiToken: process.env.GITHUB_TOKEN || null,
        }
    }
}