import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TextInput, Image } from "react-native"
import { px2dp } from '../unit/unit'
import Icon from 'react-native-vector-icons/Feather'

export default class SearchBar extends React.Component {
 
  constructor(props) {
    super(props)
  }


  render () { 
    return (
      <View style={styles.navContainer}>
        <View style={styles.inputBox}>
          <Icon name={'search'} size={24} color={'#999'}  style={styles.searchIcon} />
          <TextInput style={styles.input}
            selectionColor="#000"
            placeholder="搜索音乐、视频、歌词、电台"
            onChange={this.handleChange}
          />
        </View>
      </View>
    )
  }

  handleChange = (e) => {
    this.props.inputValue(e.nativeEvent.text)
  }
 

}
const styles = StyleSheet.create({
  navContainer: {
    height: px2dp(98),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 40, 
    width: '95%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#F2F2F2',
    alignItems: 'center'
  },
  searchIcon: {
    marginLeft: 15,
    fontWeight: 'bold',
    marginRight: 10
  },
  input: {
    padding: 0
  }
})
