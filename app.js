#!/usr/bin/env node
const generateConfig = require('./generateConfig')
async function start() {
  await generateConfig()
  require('./server').serveNcmApi({
    checkVersion: false,
  })
}
start()

module.exports = {
  start
}
