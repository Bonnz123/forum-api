import AuthenticationTokenManager from '../../../Applications/security/AuthenticationTokenManager.js';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError.js';
import container from '../../../Infrastructures/container.js';

const authenticationMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.indexOf('Bearer ') !== -1) {
    token = token.split('Bearer ')[1];

    const Authentication = container.getInstance(
      AuthenticationTokenManager.name,
    );

    await Authentication.verifyAccessToken(token);

    const user = await Authentication.decodePayload(token);

    req.user = user;

    next();
  } else {
    throw new AuthenticationError('Missing authentication');
  }
};

export { authenticationMiddleware };
