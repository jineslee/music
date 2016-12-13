const app = require('./server/app')

const server = app.listen(process.env.PORT || 2080, error => {
  if (error) throw error
  const address = server.address()
  app.set('url', `http://127.0.0.1:${address.port}`)
  console.log('server is ready @ http://127.0.0.1:' + address.port)
})
