function error(ctx, next) {
  return next().then(() => {
    if (!ctx.error) {
    } else {
      app.emit('error', ctx.error, ctx)
      ctx.status = ctx.error.status || 500
      ctx.body = {msg: ctx.error.msg || ctx.error.toString()}
    }
  })
}
module.exports = error
