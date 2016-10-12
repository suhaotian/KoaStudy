function logger(ctx, next) {
  const start = new Date()
  console.log('logger start', sts('123456', config.key))
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
  console.log('logger end')
}
module.exports = logger
