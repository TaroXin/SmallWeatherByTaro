const request = require('request')

request.get('https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SRC&js_code=code&grant_type=authorization_code', function(err, res, body) {
  if (!err && res.statusCode === 200) {
    console.log(body)
  } else {
    console.log(err)
  }
})
