import { Dimensions } from 'react-native'

export const deviceH = Dimensions.get('window').height
export const deviceW = Dimensions.get('window').width

const basePx = 750
/**
 * 
 * @param {*} px 
 * 屏幕适配工具函数
 */
export function px2dp(px) {
    return px *  deviceW / basePx
}
/**
 * 
 * @param {*} time 
 * 时间戳转换时间工具函数
 */
export const transTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute > 10 ? minute : (`0${minute}`)}:${second > 9 ? second : ('0' + second)}`
};
