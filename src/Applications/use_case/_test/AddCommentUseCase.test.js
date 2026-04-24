import { describe, expect } from 'vitest';
import AddedComment from '../../../Domains/comments/entities/AddedComment.js';
import CommentRepository from '../../../Domains/comments/CommentRepository.js';
import ThreadRepository from '../../../Domains/threads/ThreadRepository.js';
import { vi } from 'vitest';
import AddCommentUseCase from '../AddCommentUseCase.js';

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      threadId: 'thread-123',
      content: 'comment content',
    };

    const userId = 'user-123';

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: userId,
    });

    // creating the dependency of user case
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    // mocking the needed function
    mockThreadRepository.verifyAvailableThread = vi
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.addComment = vi
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));

    // creating use case instance
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(
      userId,
      useCasePayload,
    );

    // Assert
    expect(addedComment).toStrictEqual(
      new AddedComment({
        id: 'comment-123',
        content: useCasePayload.content,
        owner: userId,
      }),
    );

    expect(mockThreadRepository.verifyAvailableThread).toHaveBeenCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.addComment).toHaveBeenCalledWith({
      userId,
      ...useCasePayload
    });
  });
});
