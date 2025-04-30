/* eslint-disable no-undef */
const NotFoundError = require('../NotFoundError');

describe('A NotFoundError Class', () => {
  it('should create an error correctly', () => {
    // arrange
    const notFoundError = new NotFoundError('an error occured');

    // assert
    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.message).toEqual('an error occured');
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
