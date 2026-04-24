import UsersTableTestHelper from '../../../../tests/UsersTableTestHelper';
import ThreadsTableTestHelper from '../../../../tests/ThreadsTableTestHelper';
import CommentsTableTestHelper from '../../../../tests/CommentsTableTestHelper';
import pool from '../../database/postgres/pool';
import CommentLikesTableTestHelper from '../../../../tests/CommentLikesTableTestHelper';
import CommentLikeRepositoryPostgres from '../CommentLikeRepositoryPostgres';

describe('CommentLikeRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123' });
    await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
    await CommentsTableTestHelper.addComment({ id: 'comment-123' });
  });

  afterEach(async () => {
    await CommentLikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addLike function', () => {
    it('should add a like to the database', async () => {
      // Arrange
      const userId = 'user-123';
      const commentId = 'comment-123';
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(
        pool,
      );

      // Action
      await commentLikeRepositoryPostgres.addLike(userId, commentId);

      // Assert
      const like = await CommentLikesTableTestHelper.findCommentLikes(
        userId,
        commentId,
      );
      expect(like).toHaveLength(1);
    });
  });

  describe('isCommentLikedByUser function', () => {
    it('should return an empty array if the comment is not liked by the user', async () => {
      // Arrange
      const userId = 'user-123';
      const commentId = 'comment-123';
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(
        pool,
      );

      // Action
      const like = await commentLikeRepositoryPostgres.isCommentLikedByUser(
        userId,
        commentId,
      );

      // Assert
      expect(like).toHaveLength(0);
    });

    it('should return an array with the like if the comment is liked by the user', async () => {
      // Arrange
      const userId = 'user-123';
      const commentId = 'comment-123';
      await CommentLikesTableTestHelper.addCommentLike({ userId, commentId });
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(
        pool,
      );

      // Action
      const like = await commentLikeRepositoryPostgres.isCommentLikedByUser(
        userId,
        commentId,
      );

      // Assert
      expect(like).toHaveLength(1);
    });
  });

  describe('deleteLike function', () => {
    it('should delete the like from the database', async () => {
      // Arrange
      const userId = 'user-123';
      const commentId = 'comment-123';
      await CommentLikesTableTestHelper.addCommentLike({ userId, commentId });
      const commentLikeRepositoryPostgres = new CommentLikeRepositoryPostgres(
        pool,
      );

      // Action
      await commentLikeRepositoryPostgres.deleteLike(userId, commentId);

      // Assert
      const like = await CommentLikesTableTestHelper.findCommentLikes(
        userId,
        commentId,
      );
      expect(like).toHaveLength(0);
    });
  });
});
