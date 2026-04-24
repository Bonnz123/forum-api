import { describe, expect } from 'vitest';
import CommentRepository from '../CommentRepository.js';

describe('CommentRepository', () => {
  it('should throw error when invoke abstract function', async () => {
    const commentRepository = new CommentRepository();

    await expect(commentRepository.addComment({})).rejects.toThrow(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(commentRepository.verifyCommentAccess({})).rejects.toThrow(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      commentRepository.verifyAvailableComment('', ''),
    ).rejects.toThrow('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(commentRepository.softDeleteComment({})).rejects.toThrow(
      'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
