/* eslint-disable no-undef */
const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('HTTP server', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /users', () => {
    it('should response 201 and persisted user', async () => {
      // Arrange
      const requestPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    });
  });
  describe('when GET /', () => {
    it('should return 200 and hello world', async () => {
      // Arrange
      const server = await createServer({});
      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/',
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual('Hello world!');
    });
  });
  it('should response 400 when request payload not contain needed property', async () => {
    // Arrange
    const requestPayload = {
      username: 'rif',
      password: 'p',
      fullname: undefined,
    };
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual('fail');
    expect(responseJson.message).toEqual('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada');
  });
  it('should response 400 when request payload not meet data type specification', async () => {
    // Arrange
    const requestPayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: ['Dicoding Indonesia'],
    };
    const server = await createServer(container);
    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });
    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual('fail');
    expect(responseJson.message).toEqual('tidak dapat membuat user baru karena tipe data tidak sesuai');
  });
  it('should response 400 when username more than 50 character', async () => {
    // Arrange
    const requestPayload = {
      username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };
    const server = await createServer(container);
    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });
    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual('fail');
    expect(responseJson.message).toEqual('tidak dapat membuat user baru karena karakter username melebihi batas limit');
  });
  it('should response 400 when username contain restricted character', async () => {
    // Arrange
    const requestPayload = {
      username: 'dicoding indonesia',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };
    const server = await createServer(container);
    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });
    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual('fail');
    expect(responseJson.message).toEqual('tidak dapat membuat user baru karena username mengandung karakter terlarang');
  });
  it('should response 400 when username unavailable', async () => {
    // Arrange
    await UsersTableTestHelper.addUser({ username: 'dicoding' });
    const requestPayload = {
      username: 'dicoding',
      fullname: 'Dicoding Indonesia',
      password: 'super_secret',
    };
    const server = await createServer(container);
    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });
    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(400);
    expect(responseJson.status).toEqual('fail');
    expect(responseJson.message).toEqual('username tidak tersedia');
  });
});
