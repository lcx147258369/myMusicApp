import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Feather'
import { px2dp } from '../../unit/unit'
import { connect } from 'react-redux'
import { setPlayId } from '../../redux/actions';
 class MusicItem extends React.Component {
  constructor (props) {
    super(props)
  }

  handleTarget = () => {
    const { dispatch, navigation, data } = this.props;
    dispatch(setPlayId(data.id));
    navigation.navigate('MusicPlay', {id: data.id});
  } 

  render () {
    return (
      <TouchableOpacity style={styles.item} onPress={this.handleTarget}>
         <View style={styles.itemLeft}>
            <Text 
              ellipsizeMode="tail" 
              numberOfLines={1} 
              style={styles.itemName}
            >{ this.props.data.name}</Text>
            <Text 
              style={ styles.itemSinger }
            >{ this.props.data.artists[0].name + ' - ' + this.props.data.album.name }</Text>
         </View>
         <View style={styles.itemRight}>
            <Icon name="play-circle" size={24} color="#888"></Icon>
         </View>
      </TouchableOpacity>
    )
  }
}
const mapStateToProps = ({currentPlay}) => ({
    currentPlayId: currentPlay.id,
})

export default connect(mapStateToProps)(MusicItem)

const styles = StyleSheet.create({
  item: {
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,.1)'  
  },
  itemLeft: {
    flex: 8,
    paddingRight: 20
  },
  itemName: {
    fontSize: 16
  },
  itemSinger: {
    color: '#888',
    paddingTop: 5
  },
  itemRight: {
    flex: 1,
  }
})