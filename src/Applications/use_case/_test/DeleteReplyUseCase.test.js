import { describe, vi } from 'vitest';
import ThreadRepository from '../../../Domains/threads/ThreadRepository';
import CommentRepository from '../../../Domains/comments/CommentRepository';
import ReplyRepository from '../../../Domains/replies/ReplyRepository';
import DeleteReplyUseCase from '../DeleteReplyUseCase';

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      replyId: 'reply-123',
    };

    const userId = 'user-123';

    // creating the dependency of user case
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    // mocking the needed function
    mockThreadRepository.verifyAvailableThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyAvailableComment = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.verifyReplyAccess = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.softDeleteReply = vi
      .fn()
      .mockImplementation(() => Promise.resolve());

    // creating user case instance
    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    await deleteReplyUseCase.execute(userId, useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(
      useCasePayload.threadId,
    );

    expect(mockCommentRepository.verifyAvailableComment).toBeCalledWith(
      useCasePayload.threadId,
      useCasePayload.commentId,
    );

    expect(mockReplyRepository.verifyReplyAccess).toBeCalledWith({
      userId,
      commentId: useCasePayload.commentId,
      replyId: useCasePayload.replyId,
    });

    expect(mockReplyRepository.softDeleteReply).toBeCalledWith({
      replyId: useCasePayload.replyId,
      content: '**balasan telah dihapus**',
      is_delete: true,
    });
  });
});
