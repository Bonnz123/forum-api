import AddedReply from '../../../Domains/replies/entities/AddedReply';
import ReplyRepository from '../../../Domains/replies/ReplyRepository';
import ThreadRepository from '../../../Domains/threads/ThreadRepository';
import CommentRepository from '../../../Domains/comments/CommentRepository';
import { expect, vi } from 'vitest';
import AddReplyUseCase from '../AddReplyUseCase';

describe('AddReplyUseCase', () => {
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      content: 'reply content',
    };

    const userId = 'user-123';

    const mockAddedReply = new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      owner: userId,
    });

    // creating the dependency of use case
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
    mockReplyRepository.addReply = vi
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedReply));

    // creating use case instance
    const addReplyUseCase = new AddReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const addedReply = await addReplyUseCase.execute(userId, useCasePayload);

    // Assert
    expect(addedReply).toStrictEqual(
      new AddedReply({
        id: 'reply-123',
        content: useCasePayload.content,
        owner: userId,
      }),
    );
    expect(mockThreadRepository.verifyAvailableThread).toHaveBeenCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.verifyAvailableComment).toHaveBeenCalledWith(
      useCasePayload.threadId,
      useCasePayload.commentId,
    );

    expect(mockReplyRepository.addReply).toHaveBeenCalledWith({
      userId,
      ...useCasePayload,
    });
  });
});
