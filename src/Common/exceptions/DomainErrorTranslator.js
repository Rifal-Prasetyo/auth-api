const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHAR': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),

  'LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat melakukan login karena properti yang dibutuhkan tidak ada'),
  'LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat melakukan login karena tipe data tidak sesuai'),

  'REFRESH_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('refresh token tidak ditemukan pada payload'),
  'REFRESH_TOKEN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
};

module.exports = DomainErrorTranslator;
