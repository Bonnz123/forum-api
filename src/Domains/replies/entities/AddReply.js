class AddReply {
  constructor(payload) {
    this._verifyPayload(payload);

    this.content = payload.content;
  }

  _verifyPayload(payload) {
    if (!payload.content) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof payload.content !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default AddReply;