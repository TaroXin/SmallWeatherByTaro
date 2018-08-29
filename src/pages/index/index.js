import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import MapSdk from '../../lib/qqmap-wx-jssdk'
import Weather from '../../api/Weather'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    location: {},
    statusBarHeight: 0,
    now: {}, // 当天的天气预报
    dailyForecast: {}, // 最近七天的天气预报
  }

  componentDidMount () {
    if (Taro.getEnv() === 'WEAPP') {
      this.getSystemInfo()
      this.getUserLocation()
      this.mapSdk = new MapSdk({
        key: 'EEABZ-LMTE6-VP3S4-MN5RX-OMNKZ-2FFMU'
      })
    }
  }

  getSystemInfo () {
    wx.getSystemInfo({
      success: res => {
        this.setState({
          statusBarHeight: res.statusBarHeight
        })
      }
    })
  }

  getUserLocation () {
    wx.showLoading({
      title: '定位中...',
      mask: true,
    })

    wx.getLocation({
      type: 'gcj02',
      success: this.updateLocation.bind(this),
      fail: this.showLocationError.bind(this)
    })
  }

  updateLocation (e) {
    this.mapSdk.reverseGeocoder({
      location: `${e.latitude},${e.longitude}`,
      get_poi: 1,
      success: res => {
        wx.hideLoading()
        if (res.status === 0) {
          console.log(res)
          this.setState({
            location: {
              lat: e.latitude,
              lon: e.longitude,
              name: res.result.formatted_addresses.recommend
            }
          }, () => {
            this.weather = new Weather(`${this.state.location.lat},${this.state.location.lon}`, 'ad44358729bb4b65af612e58890ded76')
            this.getWeatherData()
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        console.log(err)
        wx.showToast({
          title: '定位失败, 请稍候重新尝试',
          icon: 'none'
        })
      }
    })
  }

  showLocationError () {
    wx.hideLoading()
    wx.showToast({
      title: '检测到您未授权位置权限，建议您手动开启',
      icon: 'none',
      duration: 3000
    })
  }

  getWeatherData () {
    this.weather.now().then(res => {
      this.setState({ now: res.now })
    }).catch(() => {
      wx.showToast({
        title: '获取天气数据失败',
        icon: 'none'
      })
    })
  }

  render () {
    let { now } = this.state

    return (
      <View className='index'>
        <View style={{marginTop: this.state.statusBarHeight + 'px'}} className='action-bar'>
          {this.state.location.name || '定位中...'}
        </View>

        <View className='tmp-curr'>
          <Text className='tmp'>{now.fl}</Text>
          <Text className='degree'>℃</Text>
        </View>

        <View style={{height: '600px'}}></View>
      </View>
    )
  }
}

