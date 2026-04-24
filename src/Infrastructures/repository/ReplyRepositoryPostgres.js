import AuthorizationError from '../../Commons/exceptions/AuthorizationError.js';
import NotFoundError from '../../Commons/exceptions/NotFoundError.js';
import AddedReply from '../../Domains/replies/entities/AddedReply.js';
import ReplyRepository from '../../Domains/replies/ReplyRepository.js';

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply({ userId, threadId, commentId, content }) {
    const id = `reply-${this._idGenerator()}`;
    const created_at = new Date().toISOString();
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
      values: [id, content, created_at, threadId, userId, commentId],
    };

    const result = await this._pool.query(query);

    return new AddedReply(result.rows[0]);
  }

  async verifyReplyAccess({ userId, commentId, replyId }) {
    const query = {
      text: 'SELECT owner FROM comments WHERE id = $1 AND parent_id = $2',
      values: [replyId, commentId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) throw new NotFoundError('reply tidak ditemukan');

    const { owner } = result.rows[0];
    if (owner !== userId)
      throw new AuthorizationError('anda tidak berhak mengakses resource ini');
  }

  async softDeleteReply({ replyId, content, is_delete }) {
    const query = {
      text: 'UPDATE comments SET content = $1, is_delete = $2 WHERE id = $3',
      values: [content, is_delete, replyId],
    };

    await this._pool.query(query);
  }
}

export default ReplyRepositoryPostgres;
