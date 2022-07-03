// These secrets are for local development
// Not to be used for production

const config = {
  database: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wunderbike',
    ssl: false,
    port: 5432,
  },
  secret: 'sEcReT',
};

export { config };
