import log from '../utils/log'
import { executeStack } from '../stacks'
const Net = require('net');
const server = new Net.Server();

const port = 7788

const initRossTalk = () => new Promise(resolve => {
  server.listen(port, () => {
    log('info', 'core/lib/network/rosstalk', `🚀 RossTalk Server ready at tcp://0.0.0.0:${port}`)
    resolve()
  })

  server.on('error', err => {
    log('error', 'core/lib/network/rosstalk', err)
  })

  server.on('connection', (socket) => {
    socket.on('data', (chunk) => {
      const match = chunk.toString().match(/(GPI [A-z,0-9]{9})/g)
      if (match.length > 0) {
        executeStack(match[0].slice(4), 'RossTalk')
      }
    })
  })
})

export { initRossTalk }
