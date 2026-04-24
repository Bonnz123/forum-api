import { describe } from 'vitest';
import ReplyRepository from '../ReplyRepository';

describe('ReplyRepository', () => {
  it('should throw error when invoke abstract function', async () => {
    const replyRepository = new ReplyRepository();

    await expect(replyRepository.addReply({})).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(replyRepository.verifyReplyAccess({})).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(replyRepository.softDeleteReply({})).rejects.toThrowError(
      'REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
