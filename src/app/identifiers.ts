const SERVICE_IDENTIFIER = {
    RemoteGitRepository: Symbol.for('RemoteGitRepository'),
    LocalGitRepository: Symbol.for('LocalGitRepository'),
    
    LocalGitService: Symbol.for('LocalGitService'),
    RemoteGitService: Symbol.for('RemoteGitService')
}

export { SERVICE_IDENTIFIER }