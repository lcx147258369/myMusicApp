import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Image, TouchableOpacity } from "react-native"
import { px2dp } from '../../unit/unit'
import { SEARCH_HOT } from '../../api/index.js'

export default class HotMusicName extends React.Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   data: []
    // }
  }

  // componentDidMount() {
  //   this.fetchData()
  // }

  // fetchData = () => {
  //   try {
  //     (
  //       async () => {
  //         const res = await fetch(SEARCH_HOT)
  //         const data = await res.json()
  //         console.log(data)
  //         if (data.code == 200) {
  //           this.setState({
  //             data: data.result.hots
  //           })
  //         }
  //       }
  //     )()
  //   } catch(err) {
  //       console.log(err)
  //   }
  // }

  render () {
    var tags
    if(this.props.data && this.props.data.length > 0) {
      tags = this.props.data.map((item, index) => 
      (
        <TouchableOpacity key={index.toString()} onPress={() => this.props.hotValue(item.first)}>
          <Text style={styles.tagsItem} >{ item.first }</Text>
        </TouchableOpacity>
       )
      )
    } else {
      tags = <Text style={styles.tagsItem}>暂无</Text>
    }

    return (
      <View style={styles.content}>
        <View style={styles.tagTitle}><Text>热门搜索</Text></View>
        <View style={styles.tags}>
            { tags }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10  
  }, 
  tagTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#666'
  },
  tags: {
    marginTop: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  tagsItem: {
    height: 32,
    marginRight: 8,
    marginBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    lineHeight: 32,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1
  }
})