import { describe } from 'vitest';
import AddedReply from '../AddedReply';

describe('AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'lorem ipsum',
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrow(
      'ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'lorem ipsum',
      owner: {},
    };

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrow(
      'ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create addedReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      content: 'lorem ipsum',
      owner: 'user-123',
    };

    // Action
    const addedReply = new AddedReply(payload);

    // Assert
    expect(addedReply.id).toEqual(payload.id);
    expect(addedReply.content).toEqual(payload.content);
    expect(addedReply.owner).toEqual(payload.owner);
  });
});
