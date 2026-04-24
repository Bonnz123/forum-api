import AuthorizationError from '../../Commons/exceptions/AuthorizationError.js';
import NotFoundError from '../../Commons/exceptions/NotFoundError.js';
import CommentRepository from '../../Domains/comments/CommentRepository.js';
import AddedComment from '../../Domains/comments/entities/AddedComment.js';

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment({ userId, threadId, content }) {
    const id = `comment-${this._idGenerator()}`;
    const created_at = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments(id, content, created_at, thread_id, owner) VALUES ($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, content, created_at, threadId, userId],
    };

    const result = await this._pool.query(query);
    return new AddedComment(result.rows[0]);
  }

  async verifyCommentAccess({ userId, threadId, commentId }) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('comment tidak ditemukan');
    }

    const { owner } = result.rows[0];
    if (owner !== userId) {
      throw new AuthorizationError('anda tidak berhak mengakses resource ini');
    }
  }

  async verifyAvailableComment(threadId, commentId) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new NotFoundError('comment tidak ditemukan');
  }

  async softDeleteComment({ commentId, content, is_delete }) {
    const query = {
      text: 'UPDATE comments SET content = $1, is_delete = $2 WHERE id = $3',
      values: [content, is_delete, commentId],
    };

    await this._pool.query(query);
  }
}

export default CommentRepositoryPostgres;
