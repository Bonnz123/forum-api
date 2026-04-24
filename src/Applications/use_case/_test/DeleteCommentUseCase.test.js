import { describe, expect } from 'vitest';
import CommentRepository from '../../../Domains/comments/CommentRepository';
import { vi } from 'vitest';
import DeleteCommentUseCase from '../DeleteCommentUseCase';
import ThreadRepository from '../../../Domains/threads/ThreadRepository';

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    const userId = 'user-123';

    // creating the dependency of user case
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    // mocking the needed function
    mockThreadRepository.verifyAvailableThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentAccess = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.softDeleteComment = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    // creating user case instance
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await deleteCommentUseCase.execute(userId, useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyAvailableThread).toHaveBeenCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.verifyCommentAccess).toHaveBeenCalledWith({
      userId,
      ...useCasePayload,
    });
    expect(mockCommentRepository.softDeleteComment).toHaveBeenCalledWith({
      commentId: useCasePayload.commentId,
      content: '**komentar telah dihapus**',
      is_delete: true,
    });
  });
});
