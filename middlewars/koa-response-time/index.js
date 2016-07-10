// x-response-time

function index(ctx, next) {
  const start = new Date()
  console.log('x-response-time start')
  next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms} ms`)
  console.log('x-response-time end')
}

module.exports = index