var { expressjwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const domain = 'sls-codingly.eu.auth0.com';
const audience = 'https://dormawunderbike.com';

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
