require('dotenv').config();


require('greenlock-express')
.init({
  packageRoot: __dirname,
  configDir: './conf/greenlock',

  // contact for security and critical bug notices
  maintainerEmail: process.env.MAINTAINER_EMAIL,

  // whether or not to run at cloudscale
  cluster: false
})
// Serves on 80 and 443
// Get's SSL certificates magically!
.serve(require('./app.js'));

const startTime = Date.now();
console.log(`[${(new Date().toISOString())}] [SYSTEM] Web server initializing.`);

process.on('SIGINT', () => {
  console.log(`[${new Date().toISOString()}] [SYSTEM] Web server exiting. Elapsed runtime: ${Date.now() - startTime} millseconds.`)
  process.exit(0);
});
