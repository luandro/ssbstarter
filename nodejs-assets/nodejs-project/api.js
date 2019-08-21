const rn_bridge = require('rn-bridge')
const pull = require('pull-stream')
const drain = require('pull-drain-gently')

module.exports = sbot => {
  rn_bridge.channel.on('message', msg => {
    console.log('MESSAGE', msg)
    if (msg.type === 'publish') {
      // feed.publish({ type: 'post', text: 'My First Post!' }, (err, msg, hash) => {
      //   // the message as it appears in the database:
      //   console.log(msg)
      //   // and its hash:
      //   console.log(hash)
      // })
    }
    rn_bridge.channel.send(sbot.id)
  })
  sbot.whoami((err, data) => {
    rn_bridge.channel.send(data.id)
  })
  pull(
    sbot.createLogStream(),
    pull.collect((err, ary) => {
      console.log(ary)
      rn_bridge.channel.send(ary)
    })
  )
}
