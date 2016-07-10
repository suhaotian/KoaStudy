
// https://medium.com/get-outside/migrating-from-php-to-node-js-522768ac482a#.fzligoy19
// https://cnodejs.org/topic/5059ce39fd37ea6b2f07e1a3


import koa from 'koa'
import cors from './middlewars/koa-cors'
import xResponseTime from './middlewars/koa-response-time'

const app = new koa()

// x-response-time
app.use(xResponseTime)

// cors
app.use(cors())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  console.log('logger start')
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
  console.log('logger end')
})

app.use( ctx => {
  ctx.body = { msg: 'Hello Koa 2.0' }
})

export default function init(ip='localhost', port=8082) {
  console.log(`Listen at: ${ip}:${port}`)
  app.listen(port, ip)
}

