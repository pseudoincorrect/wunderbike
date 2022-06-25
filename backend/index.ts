
async function startServer() {
 require('./server.js');
}

startServer();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});