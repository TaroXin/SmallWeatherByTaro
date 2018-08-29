class Weather {
  constructor (location, key) {
    this.location = location
    this.key = key
  }

  get (url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data: {
          location: this.location,
          key: this.key
        },
        method: 'GET',
        success: res => {
          if (res.statusCode === 200 && res.data.HeWeather6[0]) {
            resolve(res.data.HeWeather6[0])
          } else {
            reject(new Error('获取天气信息失败'))
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }

  now () {
    return this.get('https://free-api.heweather.com/s6/weather/now')
  }

  forecast () {
    return this.get('https://free-api.heweather.com/s6/weather/forecast')
  }
}

export default Weather
