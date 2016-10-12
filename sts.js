import crypto from 'crypto'

function sts(str, app_secret) {
  return crypto.createHmac('sha1', app_secret).update(str).digest().toString('base64') 
}

export default sts