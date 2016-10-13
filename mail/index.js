// smtp.qq.com
const nodemailer = require('nodemailer')
const mailConfig = require('./mailConfig')

const transporter = nodemailer.createTransport(mailConfig)

module.exports = transporter
