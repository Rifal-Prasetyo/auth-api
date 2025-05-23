class RegisteredUser {
  constructor({ id, username, fullname }) {
    if (!id || !username || !fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }
}

module.exports = RegisteredUser;
