// x-response-time

function responseTime(ctx, next) {
  const start = new Date()
  return next().then(() => {
    ctx.set('X-Response-Time', `${new Date() - start} ms`)
  })
}

module.exports = responseTime
