/* eslint-disable no-undef */
const RegisterUser = require('../RegisterUser');

describe('a register user entity', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did not meet the type spesification', () => {
    // Arrange
    const payload = {
      username: 34456,
      password: 'oi',
      fullname: true,
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should throw error when payload username length more than 50 character', () => {
    // Arrange
    const payload = {
      username: 'dicodingdicodingdicodingdicodingdicodingdicodingdicodingdicodingdicodingdicodingdicodingdicodingdicodingdicoding',
      password: '123',
      fullname: 'Rifal',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });
  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: 'dic oding',
      password: '239',
      fullname: 'rifal',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrow('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHAR');
  });
  it('should create RegisterUser correctly', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
      password: 'Indonesia',
      fullname: 'rifal Prasetyo',
    };

    // Action
    const registerUser = new RegisterUser(payload);

    // Assert
    expect(registerUser.username).toEqual(payload.username);
    expect(registerUser.fullname).toEqual(payload.fullname);
    expect(registerUser.password).toEqual(payload.password);
  });
});
