import CommentLikeRepository from '../../Domains/commentLikes/CommentLikeRepository.js';

class CommentLikeRepositoryPostgres extends CommentLikeRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addLike(userId, commentId) {
    const query = {
      text: 'INSERT INTO comment_likes VALUES($1, $2)',
      values: [userId, commentId],
    };

    await this._pool.query(query);
  }

  async isCommentLikedByUser(userId, commentId) {
    const query = {
      text: 'SELECT * FROM comment_likes WHERE owner = $1 AND comment_id = $2',
      values: [userId, commentId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async deleteLike(userId, commentId) {
    const query = {
      text: 'DELETE FROM comment_likes WHERE owner = $1 AND comment_id = $2',
      values: [userId, commentId],
    };

    await this._pool.query(query);
  }
}

export default CommentLikeRepositoryPostgres;