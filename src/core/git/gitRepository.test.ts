// import { syncExec } from '../../utils/asyncExec.handler';
// import { LocalGitRepository } from './';
// import 'ts-jest/globals';

// jest.mock('../../utils/asyncExec.handler');

// describe('LocalGitRepository', () => {
//   let localGitRepository: LocalGitRepository;
//   let mockSyncExec: jest.Mock;

//   beforeEach(() => {
//     localGitRepository = new LocalGitRepository();
//     // mockSyncExec = mocked(syncExec, true);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should initialize repository', () => {
//     localGitRepository.initializeRepo();
//     expect(mockSyncExec).toHaveBeenCalledWith('git init', 'Repository initialized successfully', 'Error initializing repository');
//   });

//   it('should get current branch', () => {
//     localGitRepository.getCurrentBranch();
//     expect(mockSyncExec).toHaveBeenCalledWith('git branch --show-current', 'Current branch retrieved successfully', 'Error retrieving current branch');
//   });

//   it('should delete branch', () => {
//     localGitRepository.deleteBranch('test');
//     expect(mockSyncExec).toHaveBeenCalledWith('git branch -D test', 'Branch test deleted successfully', 'Error deleting branch test');
//   });

//   it('should switch branch', () => {
//     localGitRepository.switchBranch('test');
//     expect(mockSyncExec).toHaveBeenCalledWith('git checkout test', 'Switched to branch test successfully', 'Error switching to branch test');
//   });

//   it('should merge branch', () => {
//     localGitRepository.mergeBranch('test');
//     expect(mockSyncExec).toHaveBeenCalledWith('git merge test', 'Branch test merged successfully', 'Error merging branch test');
//   });

//   it('should push to remote', () => {
//     localGitRepository.pushToRemote('test', true);
//     expect(mockSyncExec).toHaveBeenCalledWith('git push --set-upstream origin test', 'Branch test pushed successfully', 'Error pushing branch test');
//   });

//   it('should create branch', () => {
//     localGitRepository.createBranch('test', 'feature');
//     expect(mockSyncExec).toHaveBeenCalledWith('git checkout -b feature/test', 'Branch test created successfully', 'Error creating branch test');
//   });

//   it('should get remote repo name', () => {
//     mockSyncExec.mockReturnValueOnce('https://github.com/user/repo.git');
//     const repoName = localGitRepository.getRemoteRepoName();
//     expect(mockSyncExec).toHaveBeenCalledWith('git config --get remote.origin.url', 'Remote repository name retrieved successfully', 'Error retrieving remote repository name');
//     expect(repoName).toBe('repo');
//   });
// });