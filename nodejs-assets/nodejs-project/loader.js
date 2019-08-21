const os = require('os')
const path = require('path')
const rnBridge = require('rn-bridge')

// Set default directory
const nodejsProjectDir = path.resolve(rnBridge.app.datadir(), 'nodejs-project')
os.homedir = () => nodejsProjectDir
process.cwd = () => nodejsProjectDir
console.log('nodejsProjectDir', nodejsProjectDir)
// Force libsodium to use a WebAssembly implementation
process.env = process.env || {}
process.env.CHLORIDE_JS = 'yes'

require('./index')
