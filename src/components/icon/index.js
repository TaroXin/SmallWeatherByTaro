import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import './iconfont.css'

export default class Iconfont extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.getIconName(props.code)
    }
  }

  getIconName(code, isNight) {
    const nightMap = {
      '100': 'qingye',
      '200': 'qingye',
      '201': 'qingye',
      '202': 'qingye',
      '203': 'qingye',
      '204': 'qingye',
      '101': 'duoyunye',
      '102': 'duoyunye',
      '103': 'duoyunye',
      '300': 'zhenyuye',
      '301': 'zhenyuye',
      '302': 'zhenyuye',
      '303': 'zhenyuye',
      '304': 'zhenyuye',
      '305': 'zhenyuye',
      '306': 'zhenyuye',
      '307': 'zhenyuye',
      '308': 'zhenyuye',
      '309': 'zhenyuye',
      '310': 'zhenyuye',
      '311': 'zhenyuye',
      '312': 'zhenyuye',
      '313': 'zhenyuye',
      '314': 'zhenyuye',
      '315': 'zhenyuye',
      '316': 'zhenyuye',
      '399': 'zhenyuye',
      '317': 'zhenyuye',
      '318': 'zhenyuye',
      '400': 'zhenxueye',
      '401': 'zhenxueye',
      '402': 'zhenxueye',
      '403': 'zhenxueye',
      '404': 'zhenxueye',
      '405': 'zhenxueye',
      '406': 'zhenxueye',
      '407': 'zhenxueye',
      '408': 'zhenxueye',
      '409': 'zhenxueye',
      '410': 'zhenxueye',
      '499': 'zhenxueye'
    }
    const dayMap = {
      '100': 'qingbai',
      '101': 'duoyunbai',
      '102': 'duoyunbai',
      '103': 'duoyunbai',
      '104': 'yin',
      '201': 'qingye',
      '202': 'qingye',
      '203': 'qingye',
      '204': 'qingye',
      '205': 'fengli',
      '206': 'fengli',
      '207': 'fengli',
      '208': 'fengli',
      '209': 'yin',
      '210': 'yin',
      '211': 'yin',
      '212': 'yin',
      '213': 'yin',

      '300': 'zhenyubai',
      '301': 'zhenyubai',
      '302': 'leizhenyu',
      '303': 'leizhenyu',
      '304': 'leizhenyuzhuanbingbao',
      '305': 'xiaoyu',
      '306': 'zhongyu',
      '307': 'dayu',
      '308': 'tedabaoyu',
      '309': 'xiaoyu',
      '310': 'baoyu',
      '311': 'dabaoyu',
      '312': 'tedabaoyu',
      '313': 'dongyu',
      '314': 'xiaoyu',
      '315': 'zhongyu',
      '316': 'dayu',
      '317': 'baoyu',
      '318': 'dabaoyu',
      '399': 'xiaoyu',

      '400': 'xiaoxue',
      '401': 'zhongxue',
      '402': 'daxue',
      '403': 'baoxue',
      '404': 'yujiaxue',
      '405': 'yujiaxue',
      '406': 'yujiaxue',
      '407': 'zhenxuebai',
      '408': 'xiaoxue',
      '409': 'zhongxue',
      '410': 'daxue',
      '499': 'xiaoxue',

      '500': 'wu',
      '501': 'wu',
      '502': 'wumaibai',
      '503': 'yangsha',
      '504': 'yangsha',
      '507': 'shachenbao',
      '508': 'qiangshachenbao',
      '509': 'wu',
      '510': 'wu',
      '511': 'wumaibai',
      '512': 'wumaibai',
      '513': 'wumaibai',
      '514': 'wu',
      '515': 'wu',

      '900': 'qingbai',
      '901': 'qingbai',
      '902': 'yin'
    }

    if (isNight && nightMap[code]) {
      return nightMap[code]
    }

    return dayMap[code] || 'yin'
  }

  render () {
    return (
      <Text className={['iconfont', 'icon-' + this.state.name]}></Text>
    )
  }
}
