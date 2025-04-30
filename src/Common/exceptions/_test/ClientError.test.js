/* eslint-disable no-undef */
const ClientError = require('../ClientError');

describe('A Client Error Abstract Class', () => {
  it('shoult throw error when directly use it', () => {
    expect(() => new ClientError('')).toThrow('cannot instiance abstract class');
  });
});
