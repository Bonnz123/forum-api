import ThreadRepository from '../../../Domains/threads/ThreadRepository';
import GetThreadDetailsUseCase from '../GetThreadDetailsUseCase';

describe('GetThreadDetailsUseCase', () => {
  it('should orchestrating the get thread details action correctly', async () => {
    // Arrange
    const ThreadId = 'thread-123';

    const mockRawQuery = [
      {
        thread_id: 'thread-123',
        title: 'Sebuah thread',
        body: 'Isi dari sebuah thread',
        thread_date: '2026-04-16T05:29:42.565Z',
        thread_username: 'dicoding',
        comment_id: 'comment-123',
        comment_content: 'Sebuah komentar',
        comment_date: '2026-04-16T05:29:42.581Z',
        comment_username: 'dicoding',
        reply_id: 'reply-123',
        reply_content: 'Sebuah balasan',
        reply_date: '2026-04-16T05:29:42.602Z',
        reply_username: 'dicoding',
      },
      {
        thread_id: 'thread-123',
        title: 'Sebuah thread',
        body: 'Isi dari sebuah thread',
        thread_date: '2026-04-16T05:29:42.565Z',
        thread_username: 'dicoding',
        comment_id: 'comment-123',
        comment_content: 'Sebuah komentar',
        comment_date: '2026-04-16T05:29:42.581Z',
        comment_username: 'dicoding',
        reply_id: 'reply-456',
        reply_content: 'Sebuah balasan2',
        reply_date: '2026-04-16T05:29:42.612Z',
        reply_username: 'dicoding2',
      },
    ];

    const mockExpectedThread = {
      id: 'thread-123',
      title: 'Sebuah thread',
      body: 'Isi dari sebuah thread',
      date: '2026-04-16T05:29:42.565Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          content: 'Sebuah komentar',
          date: '2026-04-16T05:29:42.581Z',
          username: 'dicoding',
          replies: [
            {
              id: 'reply-123',
              content: 'Sebuah balasan',
              date: '2026-04-16T05:29:42.602Z',
              username: 'dicoding',
            },
            {
              id: 'reply-456',
              content: 'Sebuah balasan2',
              date: '2026-04-16T05:29:42.612Z',
              username: 'dicoding2',
            },
          ],
        },
      ],
    };

    // creating depedency of use case
    const mockThreadRepository = new ThreadRepository();

    // mocking needed function
    mockThreadRepository.getThread = vi.fn(() => Promise.resolve(mockRawQuery));

    // creating use case instance
    const getThreadDetailsUseCase = new GetThreadDetailsUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const getDetailsThread = await getThreadDetailsUseCase.execute(ThreadId);

    // Assert
    expect(getDetailsThread).toStrictEqual(mockExpectedThread);
    expect(mockThreadRepository.getThread).toHaveBeenCalledWith(ThreadId);
  });
});
