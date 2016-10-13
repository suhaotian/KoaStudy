import Router from 'koa-router'
import request from 'request-promise'

const router = Router()

router.get('/', (ctx, next) => {
  try {
    ctx.body = {
      msg: 123
    }
  } catch(e) {
    ctx.error = e
  }
}).get('/about', (ctx, next) => {
  console.log(ctx.error)
  ctx.body = {
    msg: 'about'
  }
}).get('/article/:id', (ctx, next) => {
  ctx.body = { id: ctx.params.id }
})

function opt(uri) {
  return {
    uri: uri,
    transform: function (body, response, resolveWithFullResponse) {
      if (response.headers['content-type'] === 'application/json') {
        return JSON.parse(response)
      }
      return response
    }
  }
}
function requestTodos() {
  return request.get(opt('http://cnodejs.org/api/v1/topics?page=1&tab=ask&limit=10'))
                .then((res) => {
                  return res
                }).catch(e => {
                  console.log('失败：' + e.statusCode)
                })
}

function requestProfile() {
  return request.get(opt('http://cnodejs.org/api/v1/topics?page=1&tab=job&limit=10'))
                .then((res) => {
                  return res
                }).catch(e => {
                  console.log('失败：' + e.statusCode)
                })
}

router.get('/todos', async (ctx, next) => {
  const data = await Promise.all([requestProfile(), requestTodos()])
  ctx.body = {todos: data[0], profile: data[1]}
})

module.exports = router
