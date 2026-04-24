import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import CommentLikeRepository from '../../../Domains/commentLikes/CommentLikeRepository.js';
import ToggleLikeCommentUseCase from '../ToggleLikeCommentUseCase.js';

describe('ToggleLikeCommentUseCase', () => {
  it('should orchestrating the toggle like comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    const userId = 'user-123';

    // Creating the dependency of use case
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockCommentLikeRepository = new CommentLikeRepository();

    // Mocking needed functions
    mockThreadRepository.verifyAvailableThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyAvailableComment = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentLikeRepository.addLike = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentLikeRepository.deleteLike = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    // Creating use case instance
    const toggleLikeCommentUseCase = new ToggleLikeCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentLikeRepository: mockCommentLikeRepository,
    });

    // Scenario 1: Comment is not liked by user
    mockCommentLikeRepository.isCommentLikedByUser = vi
      .fn()
      .mockResolvedValueOnce([]);

    // Action
    await toggleLikeCommentUseCase.execute(userId, useCasePayload);

    // Assert scenario 1
    expect(mockCommentLikeRepository.addLike).toHaveBeenCalledWith(
      userId,
      useCasePayload.commentId,
    );

    // Scenario 2: Comment is already liked by user
    mockCommentLikeRepository.isCommentLikedByUser = vi
      .fn()
      .mockResolvedValueOnce([
        {
          owner: userId,
          comment_id: useCasePayload.commentId,
        },
      ]);

    // Action
    await toggleLikeCommentUseCase.execute(userId, useCasePayload);

    // Assert scenario 2
    expect(mockCommentLikeRepository.deleteLike).toHaveBeenCalledWith(
      userId,
      useCasePayload.commentId,
    );

    // Assert other dependencies
    expect(mockThreadRepository.verifyAvailableThread).toHaveBeenCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.verifyAvailableComment).toHaveBeenCalledWith(
      useCasePayload.threadId,
      useCasePayload.commentId,
    );
    expect(mockCommentLikeRepository.isCommentLikedByUser).toHaveBeenCalledWith(
      userId,
      useCasePayload.commentId,
    );
  });
});
