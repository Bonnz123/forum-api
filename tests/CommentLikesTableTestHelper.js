/* v8 ignore file */
import pool from '../src/Infrastructures/database/postgres/pool';

const CommentLikesTableTestHelper = {
  async addCommentLike({ userId, commentId }) {
    const query = {
      text: 'INSERT INTO comment_likes VALUES($1, $2)',
      values: [userId, commentId],
    };

    await pool.query(query);
  },

  async findCommentLikes(userId, commentId) {
    const query = {
      text: 'SELECT * FROM comment_likes WHERE owner = $1 AND comment_id = $2',
      values: [userId, commentId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comment_likes');
  }
};

export default CommentLikesTableTestHelper;
