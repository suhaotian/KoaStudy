require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3']
})

const init = require('./app').default


init('0.0.0.0')