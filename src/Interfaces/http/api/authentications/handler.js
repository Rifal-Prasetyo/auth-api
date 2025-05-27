const DomainErrorTranslator = require('../../../../Common/exceptions/DomainErrorTranslator');

class AuthenticationHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    try {
      const loginUserUseCase = this._container.getInstance('LoginUserUseCase');
      const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload);
      const response = h.response({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error);
      const response = h.response({
        status: 'fail',
        message: translatedError.message,
      });
      response.code(translatedError.statusCode);
      return response;
    }
  }

  async putAuthenticationHandler(request, h) {
    try {
      const refreshAuthenticationUseCase = this._container.getInstance('RefreshAuthenticationUseCase');
      const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

      return {
        status: 'success',
        data: {
          accessToken,
        },
      };
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error);
      const response = h.response({
        status: 'fail',
        message: translatedError.message,
      });
      response.code(translatedError.statusCode);
      return response;
    }
  }

  async deleteAuthenticationHandler(request, h) {
    try {
      const deleteAuthenticationUseCase = this._container.getInstance('DeleteAuthenticationUseCase');
      await deleteAuthenticationUseCase.execute(request.payload);

      return {
        status: 'success',
      };
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error);
      const response = h.response({
        status: 'fail',
        message: translatedError.message,
      });
      response.code(translatedError.statusCode);
      return response;
    }
  }
}

module.exports = AuthenticationHandler;
