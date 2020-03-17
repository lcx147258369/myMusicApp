import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TextInput, Image } from "react-native"
import { px2dp } from '../../unit/unit'


export default class SearchHistory extends React.Component {
 
  constructor(props) {
    super(props)
  }


  render () {
    const numbers = [1, 2, 3, 4, 5]
    const list = numbers.map((item) => <Text key={item} style={styles.itemTag}>{item}</Text>)
    return (
      <View>
        <View style={styles.caption}>
           <Text style={styles.captionText}>搜索历史</Text>
           <Image/>
        </View>
        <View style={styles.itemBox}>
          {
            list
          }
        </View>
      </View>
    )
  }


}
const styles = StyleSheet.create({
  caption: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  captionText: {
    color: '#cccccc',
    paddingLeft: 20
  },
  itemBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  itemTag: {
    borderRadius: 10,
    backgroundColor: '#dddddd',
    paddingLeft: 10,
    paddingRight: 10
  }
})