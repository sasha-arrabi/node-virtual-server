const express = require ('express');
const httpProxy = require('http-proxy');

const server = express()
const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
const redirectConfig = require('./conf/redirect/hosts.json');

server.set('trust proxy', true);
server.use((req, res) => {
  const LOG_PREFIX = () => `[${(new Date()).toISOString()}] [${req.ip}]`;
  const constructedUrl = req.protocol + '://' + req.get('host') + req.url;
  let redirectHostFound = false;

  try {
    const url = new URL(constructedUrl);

    for (let item of redirectConfig) {
      if (url.host === item.domain) {
        console.log(`${LOG_PREFIX()} Incoming request for ${url.href}`);
        redirectHostFound = true;
        url.host = `${item.host}:${item.port}`;
        proxy.web(req, res, {
          target: `http://${item.host}:${item.port}`
        });

        break;
      }
    };

    if (!redirectHostFound) {
      console.log(`${LOG_PREFIX()} Unable to find redirect rule for request ${constructedUrl}, aborting request`);
    }
  } catch (error) {
    console.error(`${LOG_PREFIX()} Error while attempting to redirect incoming url: ${constructedUrl}`, error);
  }
});

module.exports = server;
