import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from "react-native"
export default class RenderLoading extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          正在加载音乐数据……
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20
  }
})