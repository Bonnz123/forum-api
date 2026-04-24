import AddedThread from '../../../Domains/threads/entities/AddedTheread';
import ThreadRepository from '../../../Domains/threads/ThreadRepository';
import AddThreadUseCase from '../AddThreadUseCase';

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'title',
      body: 'body',
    };

    const userId = 'user-123';

    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: userId,
    });

    // creating depedency of use case
    const mockThreadRepository = new ThreadRepository();

    // mocking needed function
    mockThreadRepository.addThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));

    // creating use case instance
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await getThreadUseCase.execute(userId, useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(
      new AddedThread({
        id: 'thread-123',
        title: useCasePayload.title,
        owner: userId,
      }),
      expect(mockThreadRepository.addThread).toHaveBeenCalledWith(
        userId,
        useCasePayload,
      ),
    );
  });
});
