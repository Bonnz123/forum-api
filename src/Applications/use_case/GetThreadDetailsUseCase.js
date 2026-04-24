class GetThreadDetailsUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThread(threadId);

    return this._mapThread(thread);
  }

  _mapThread(rows) {
    const thread = {
      id: rows[0].thread_id,
      title: rows[0].title,
      body: rows[0].body,
      date: rows[0].thread_date,
      username: rows[0].thread_username,
      comments: [],
    };

    const commentMap = {};

    rows.forEach((row) => {
      if (row.comment_id !== null) {
        if (!commentMap[row.comment_id]) {
          commentMap[row.comment_id] = {
            id: row.comment_id,
            content: row.comment_content,
            date: row.comment_date,
            username: row.comment_username,
            likeCount: Number(row.like_count) || 0,
            replies: [],
          };

          thread.comments.push(commentMap[row.comment_id]);
        }

        if (row.reply_id !== null) {
          commentMap[row.comment_id].replies.push({
            id: row.reply_id,
            content: row.reply_content,
            date: row.reply_date,
            username: row.reply_username,
          });
        }
      }
    });

    return thread;
  }
}

export default GetThreadDetailsUseCase;
