const REPOSITORY_IDENTIFIER = {
    RemoteGitRepository: Symbol.for('RemoteGitRepository'),
    LocalGitRepository: Symbol.for('LocalGitRepository'),
}

const SERVICE_IDENTIFIER = {
    LocalGitService: Symbol.for('LocalGitService'),
    RemoteGitService: Symbol.for('RemoteGitService')
}

export { SERVICE_IDENTIFIER, REPOSITORY_IDENTIFIER }