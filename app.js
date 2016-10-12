
// https://medium.com/get-outside/migrating-from-php-to-node-js-522768ac482a#.fzligoy19
// https://cnodejs.org/topic/5059ce39fd37ea6b2f07e1a3


import koa from 'koa'
import cors from './middlewars/koa-cors'
import xResponseTime from './middlewars/koa-response-time'
import config from './config'
import router from 'koa-router'
import request from 'request'

const app = new koa()
const Router = router()

app.use(xResponseTime)
app.use(cors())

Router.get('/', (ctx, next) => {
  ctx.body = {
    msg: 'home'
  }
}).get('/about', (ctx, next) => {
  ctx.body = {
    msg: 'about'
  }
}).get('/article/:id', (ctx, next) => {
  ctx.body = { id: ctx.params.id }
})

function requestTodos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([])
    }, 100)
  })
}

function requestProfile() {
  return new Promise((resolve, reject) => {
    request.get('https://www.v2ex.com/api/nodes/all.json', (e, r, b) => {
      resolve(JSON.parse(b))
    })
  })
}

Router.get('/todos', async (ctx, next) => {
  const data = await Promise.all([requestTodos(), requestProfile()])
  ctx.body = {todos: data[0], profile: data[1]}
})
/*
.post('/todo', (ctx, next) => {
  ctx.body = {msg: 'create success'}
}).put('/todo/:id', (ctx, next) => {
  ctx.body = {id: ctx.params.id}
}).del('/todo/:id', (ctx, next) => {
  ctx.body = {id: ctx.params.id}
})
*/
app.use(Router.routes()).use(Router.allowedMethods())

export default function init(ip='localhost', port=8082) {
  console.log(`Listen at: ${ip}:${port}`)
  app.listen(port, ip)
}
