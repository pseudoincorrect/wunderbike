var { expressjwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const domain = 'sls-codingly.eu.auth0.com';
const audience = 'https://dormawunderbike.com';

/**
 * Middleware that will get the public key from our auth0 server
 * and validate the token that will be passed to the requests
 * as well as adding claims to it
 */
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://' + domain + '/.well-known/jwks.json',
  }),
  audience: audience,
  issuer: 'https://' + domain + '/',
  algorithms: ['RS256'],
});

export { checkJwt };
