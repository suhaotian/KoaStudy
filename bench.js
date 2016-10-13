const request = require('request-promise')

function sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
}

function fetch() {
  return request.get({
    uri: 'http://localhost:8082/todos',
    transform: function (body, response, resolveWithFullResponse) {
      console.log(response.headers['x-response-time'])
      if (response.headers['content-type'] === 'application/json') {
        return JSON.parse(body)
      }
    }
  }).then((body) => {
    // console.log(body)
  })
}
function loop(n) {
  let tmpArr = []
  for (let i = 0; i < n; i++) {
    tmpArr.push(fetch())
  }
  return tmpArr
}

function init(n) {
  Promise.all(loop(n))
}

init(4)
