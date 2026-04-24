import ThreadRepository from '../ThreadRepository';

describe('ThreadRepository', () => {
  it('should throw error when invoke abstract function', async () => {
    const threadRepository = new ThreadRepository();

    await expect(threadRepository.addThread('', {})).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(threadRepository.getThread('')).rejects.toThrowError(
      'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(
      threadRepository.verifyAvailableThread(''),
    ).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
