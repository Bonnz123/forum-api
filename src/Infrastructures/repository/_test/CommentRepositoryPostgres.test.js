import { describe, expect } from 'vitest';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper';
import pool from '../../database/postgres/pool';
import CommentRepositoryPostgres from '../CommentRepositoryPostgres';
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper';
import AddComment from '../../../Domains/comments/entities/AddComment';
import AddedComment from '../../../Domains/comments/entities/AddedComment';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';

describe('CommentRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123' });
    await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist add comment and return added comment correctly', async () => {
      // Arrange
      const addComment = new AddComment({
        content: 'sebuah comment',
      });

      const userId = 'user-123';
      const threadId = 'thread-123';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      await commentRepositoryPostgres.addComment({
        userId,
        threadId,
        content: addComment.content,
      });

      // Assert
      const comment =
        await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const addComment = new AddComment({
        content: 'sebuah comment',
      });

      const userId = 'user-123';
      const threadId = 'thread-123';
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedComment = await commentRepositoryPostgres.addComment({
        userId,
        threadId,
        content: addComment.content,
      });

      // Assert
      expect(addedComment).toStrictEqual(
        new AddedComment({
          id: 'comment-123',
          content: 'sebuah comment',
          owner: 'user-123',
        }),
      );
    });
  });

  describe('verifyCommentAccess function', () => {
    it('should throw NotFoundError when comment id is not found', async () => {
      // Arrange
      const userId = 'user-123';
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => '123',
      );

      await CommentsTableTestHelper.addComment({
        id: commentId,
      });

      // Action & Assert
      await expect(
        commentRepositoryPostgres.verifyCommentAccess({
          userId,
          threadId,
          commentId: 'comment-456',
        }),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw AuthorizationError when user is not owner of comment', async () => {
      // Arrange
      const userId = 'user-123';
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => '123',
      );

      await CommentsTableTestHelper.addComment({
        owner: userId,
      });

      // Action & Assert
      await expect(
        commentRepositoryPostgres.verifyCommentAccess({
          userId: 'user-456',
          threadId,
          commentId,
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it('should not throw error when comment access verified', async () => {
      // Arrange
      const userId = 'user-123';
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => '123',
      );

      await CommentsTableTestHelper.addComment({
        content: 'sebuah comment',
      });

      // Action & Assert
      await expect(
        commentRepositoryPostgres.verifyCommentAccess({
          userId,
          threadId,
          commentId,
        }),
      ).resolves.not.toThrow(AuthorizationError);
    });
  });

  describe('verifyAvailableComment function', () => {
    it('should throw NotFoundError when comment is not available', async () => {
      // Arrange
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => '123',
      );

      // Action & Assert
      await expect(
        commentRepositoryPostgres.verifyAvailableComment(threadId, commentId),
      ).rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when comment is available', async () => {
      // Arrange
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => '123',
      );

      await CommentsTableTestHelper.addComment({
        content: 'sebuah comment',
      });

      // Action & Assert
      await expect(
        commentRepositoryPostgres.verifyAvailableComment(threadId, commentId),
      ).resolves.not.toThrow(NotFoundError);
    });
  });

  describe('softDeleteComment function', () => {
    it('should soft delete comment correctly', async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        () => '123',
      );

      await CommentsTableTestHelper.addComment({
        content: 'sebuah comment',
      });

      // Action
      await commentRepositoryPostgres.softDeleteComment({
        commentId: 'comment-123',
        content: '**komentar telah dihapus**',
        is_delete: true,
      });

      // Assert
      const comment =
        await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment[0].content).toEqual('**komentar telah dihapus**');
      expect(comment[0].is_delete).toBe(true);
    });
  });
});
