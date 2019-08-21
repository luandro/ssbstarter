const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')
const ssbKeys = require('ssb-keys')
const injectSsbConfig = require('ssb-config/inject')
const rn_bridge = require('rn-bridge')
const appDataDir = rn_bridge.app.datadir()
// const appDataDir = '/tmp/.ssb-test/'

const ssbPath = path.resolve(appDataDir, '.ssb')
if (!fs.existsSync(ssbPath)) {
  console.log('creating =================>', ssbPath)
  mkdirp.sync(ssbPath)
}
const keysPath = path.join(ssbPath, '/secret')
const keys = ssbKeys.loadOrCreateSync(keysPath)

const config = (() => {
  const c = injectSsbConfig()
  c.path = ssbPath
  c.keys = keys
  c.friends.hops = 2
  return c
})()

const sbot = require('secret-stack')({})
  .use(require('ssb-db'))
  .call(null, config)

require('./api')(sbot)
