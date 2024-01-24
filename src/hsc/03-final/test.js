const WebSocket = require('ws')

return await new Promise((resolve, reject) => {
    console.log('Connecting')
    const Client = new WebSocket('wss://xrplcluster.com')
    
    Client.on('open', e => {
      console.log('Connected, request server_info')
      Client.send(JSON.stringify({ command: 'server_info' }))
    })

    Client.on('message', data => {
      console.log('Got response')
      resolve(JSON.parse(data).result.info)
      Client.close()
    }) 
})

