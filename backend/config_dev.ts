// These secrets are for local development
// Not to be used for production

const config = {
  development: {
    database: {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'wunderbike',
      ssl: false,
      port: 5432,
    },
  },
  production: {
    database: {
      host: 'postgresql',
      user: 'root',
      password: 'password',
      database: 'wunderbike',
      ssl: false,
      port: 5432,
    },
  },
  test: {
    database: {},
  },
};

export { config };
