import { describe, expect } from 'vitest';
import AddReply from '../AddReply';

describe('AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new AddReply(payload)).toThrow(
      'ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123,
    };

    // Action and Assert
    expect(() => new AddReply(payload)).toThrow(
      'ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create addReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'dummy content',
    };

    // Action
    const addReply = new AddReply(payload);

    // Assert
    expect(addReply.content).toEqual(payload.content);
  });
});
