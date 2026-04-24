import { describe } from 'vitest';
import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper';
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper';
import RepliesTableTestHelper from '../../../../tests/RepliesTableTestHelper';
import pool from '../../database/postgres/pool';
import AddReply from '../../../Domains/replies/entities/AddReply.js';
import ReplyRepositoryPostgres from '../ReplyRepositoryPostgres';
import AddedReply from '../../../Domains/replies/entities/AddedReply.js';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError.js';
import NotFoundError from '../../../Commons/exceptions/NotFoundError.js';

describe('ReplyRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123' });
    await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
    await CommentsTableTestHelper.addComment({ id: 'comment-123' });
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addReply function', () => {
    it('should persist reply and return added reply correctly', async () => {
      // Arrange
      const addReply = new AddReply({
        content: 'sebuah comment',
      });

      const userId = 'user-123';
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      await replyRepositoryPostgres.addReply({
        userId,
        threadId,
        commentId,
        content: addReply.content,
      });

      // Assert
      const reply = await RepliesTableTestHelper.findReplyById('reply-123');
      expect(reply).toHaveLength(1);
    });

    it('should return added reply corectly', async () => {
      // Arrange
      const addReply = new AddReply({
        content: 'sebuah reply',
      });

      const userId = 'user-123';
      const threadId = 'thread-123';
      const commentId = 'comment-123';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );

      // Action
      const addedReply = await replyRepositoryPostgres.addReply({
        userId,
        threadId,
        commentId,
        content: addReply.content,
      });

      // Assert
      expect(addedReply).toStrictEqual(
        new AddedReply({
          id: 'reply-123',
          content: 'sebuah reply',
          owner: 'user-123',
        }),
      );
    });
  });

  describe('verifyReplyAccess function', () => {
    it('should throw NotFoundError when no reply id found', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        () => {},
      );

      // Assert
      await expect(
        replyRepositoryPostgres.verifyReplyAccess({
          userId: 'user-123',
          commentId: 'comment-123',
          replyId: 'reply-123',
        }),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw AuthorizationError when user id not match', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        () => {},
      );
      await RepliesTableTestHelper.addReply({ id: 'reply-123' });

      // Assert
      await expect(
        replyRepositoryPostgres.verifyReplyAccess({
          userId: 'user-456',
          commentId: 'comment-123',
          replyId: 'reply-123',
        }),
      ).rejects.toThrow(AuthorizationError);
    });

    it('should not throw error when reply access verified', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        () => {},
      );
      await RepliesTableTestHelper.addReply({ id: 'reply-123' });

      // Assert
      await expect(
        replyRepositoryPostgres.verifyReplyAccess({
          userId: 'user-123',
          commentId: 'comment-123',
          replyId: 'reply-123',
        }),
      ).resolves.not.toThrow(AuthorizationError);
    });
  });

  describe('softDeleteReply function', () => {
    it('should soft delete reply correctly', async () => {
      // Arrange
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        () => {},
      );
      await RepliesTableTestHelper.addReply({ id: 'reply-123' });

      // Action
      await replyRepositoryPostgres.softDeleteReply({
        replyId: 'reply-123',
        content: '**balasan telah dihapus**',
        is_delete: true,
      });

      // Assert
      const reply = await RepliesTableTestHelper.findReplyById('reply-123');
      expect(reply[0].content).toEqual('**balasan telah dihapus**');
      expect(reply[0].is_delete).toBe(true);
    });
  });
});
