/* v8 ignore file */
import pool from '../src/Infrastructures/database/postgres/pool';

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    content = 'sebuah comment',
    thread_id = 'thread-123',
    owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5)',
      values: [id, content, new Date().toISOString(), thread_id, owner],
    };

    await pool.query(query);
  },

  async findCommentById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments');
  },
};

export default CommentsTableTestHelper;
