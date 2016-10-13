

import koa from 'koa'

/* 中间件 */
import cors from './middlewars/koa-cors'                    // 跨域
import xResponseTime from './middlewars/koa-response-time'  // 响应时间
import error from './middlewars/error'                      // 错误
/* 中间件结束 */
import errorHandler from './errorHandler'                   // 错误处理
import router from './routes'                               // 路由

const app = new koa()

app.on('error', errorHandler)
app.use(error)
app.use(xResponseTime)
app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

function init(ip='localhost', port=8082) {
  console.log(`Listen at: ${ip}:${port}`)
  app.listen(port, ip)
}

module.exports = init
