var axios = require('axios').default;

var secrets = require('./secrets/secrets');

var options = {
  method: 'POST',
  url: 'https://sls-codingly.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: new URLSearchParams({
    grant_type: 'password',
    scope: 'openid',
    username: secrets.username,
    password: secrets.password,
    audience: secrets.audience,
    client_id: secrets.client_id,
    client_secret: secrets.client_secret,
  }),
};

axios
  .request(options)
  .then(function (response) {
    console.log('\nAccess token \n ', response.data.access_token);
    console.log('\n\nID token \n', response.data.id_token);
  })
  .catch(function (error) {
    console.error(error);
  });
