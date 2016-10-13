import mail from './mail'

function errorHandler(err, ctx) {
  console.log(`Error：${ctx.method}:${ctx.url}`)
  console.log(err)
  return
  const address = '1332538987@qq.com'
  const mailOptions = {
      from: address,
      to: address,
      subject: `Error：${ctx.method}:${ctx.url}`, // Subject line
      html: `<pre style="color: red">${err.toString()}</pre>`,
  }
  // ctx.error = null
  mail.sendMail(mailOptions)
}

module.exports = errorHandler
