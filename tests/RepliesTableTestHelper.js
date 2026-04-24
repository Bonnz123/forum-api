import pool from '../src/Infrastructures/database/postgres/pool';

const RepliesTableTestHelper = {
  async addReply({
    id = 'reply-123',
    content = 'sebuah balasan',
    thread_id = 'thread-123',
    owner = 'user-123',
    parent_id = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
      values: [
        id,
        content,
        new Date().toISOString(),
        thread_id,
        owner,
        parent_id,
      ],
    };

    await pool.query(query);
  },

  async findReplyById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE parent_id IS NOT NULL');
  },
};

export default RepliesTableTestHelper;
