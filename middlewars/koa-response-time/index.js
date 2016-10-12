// x-response-time

function index(ctx, next) {
  const start = new Date()
  return next().then(() => {
    ctx.set('X-Response-Time', `${new Date() - start} ms`)
  })
}

module.exports = index
