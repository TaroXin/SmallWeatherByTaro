import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import MapSdk from '../../lib/qqmap-wx-jssdk'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    userInfo: {},
    location: '',
  }

  componentDidMount () {
    if (Taro.getEnv() === 'WEAPP') {
      this.getWechatUserInfo()
      this.getUserLocation()
      this.mapSdk = new MapSdk({
        key: 'EEABZ-LMTE6-VP3S4-MN5RX-OMNKZ-2FFMU'
      })
    }
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
            location: res.result.formatted_addresses.recommend
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

  getWechatUserInfo () {
    wx.getUserInfo({
      success: (e) => {
        this.setState({ userInfo: e.userInfo })
      }
    })
  }

  onGetUserInfo (e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      this.setState({ userInfo: e.detail.userInfo })
    }
  }

  render () {
    return (
      <View className='index'>
        <Text>{this.state.userInfo.nickName}</Text>
        <AtAvatar image={this.state.userInfo.avatarUrl} circle />
        <Text>{this.state.location}</Text>

        <Button openType='getUserInfo' type='primary' size='default' onGetUserInfo={this.onGetUserInfo.bind(this)}>
          获取用户信息
        </Button>
      </View>
    )
  }
}

