/* eslint-disable no-undef */
const AuthenticationError = require('../AuthenticationError');

describe('A AuthenticationsError Class', () => {
  it('should create an error correctly', () => {
    // arrange
    const authenticationError = new AuthenticationError('an error occured');

    // assert
    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('an error occured');
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});
