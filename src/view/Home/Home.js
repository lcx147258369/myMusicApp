import React from 'react'
import { 
  View, 
  Text,
  Button, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  Alert,
  TouchableOpacity 
} from "react-native"
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Feather'
import SearchBar from '../../components/SearchBar'
import LoadMore from '../../components/LoadMore'
import HotMusicName from './HotMusicName'
import MusicItem from './MusicItem'
import color from '../../unit/color'
import { SEARCH_DEFAULT, SEARCH_KEYWORD, SEARCH_HOT } from '../../api/index'

const TYPE = ['网易云音乐', '酷狗音乐', '酷我音乐', 'QQ音乐', '咪咕音乐']
const page = 0
export default class Home extends React.Component { 
  static navigationOptions = ({ navigation }) => ({
      headerTitle: (
        <TouchableOpacity>
            <SearchBar inputValue={ navigation.getParam('handleInput') }></SearchBar>
        </TouchableOpacity>
      ),
      headerRight: <TouchableOpacity>
                      <ModalDropdown 
                        options={TYPE}
                        defaultValue={'网易云音乐'}
                        style={{paddingRight: 10}}
                        textStyle={{color: '#fff'}}
                        dropdownStyle={{height: 'auto', marginTop: 10}}
                        onSelect={navigation.getParam('handleSelect')}
                      >
                      </ModalDropdown>
                   </TouchableOpacity>,
      headerStyle: {
        backgroundColor: color.theme
      }
  }) 

  constructor(props) {
    super(props)
    this.state = {
      hotMusic: [],       // 热门搜索歌曲
      inputValue: '',     // 搜索的关键词
      searchType: 0,      // 搜素的引擎类型
      loading: true,      // 是否需要加载
      musicList: [],      // 音乐搜索结果
      page: 1,            // 页码
    }
  }
  
  componentDidMount() {
    const navigation = this.props.navigation
    navigation.setParams({
      'handleInput': this.handleInputValue,
      'handleSelect': this.handleSelectValue
    })
    this.getSearchDefault()
    this.getHotMusic()
  }
  
  
  // 输入监听
  handleInputValue = (value) => {
    this.setState({
      inputValue: value
    })
  }


  // 搜索引擎选择事件
  handleSelectValue = (value) => {
    this.setState({
      searchType: value
    })
  }

  // 获取热门歌名
  getHotMusic = () => {
    try {
      (
        async () => {
          const res = await fetch(SEARCH_HOT)
          const data = await res.json()
          if (data.code == 200) {
            this.setState({
              hotMusic: data.result.hots
            })
          }
        }
      )()
    } catch(err) {
        console.log(err)
    }
  }

  // 确认搜索歌名
  handleGetMusic = () => {
    this.setState({
      musicList: []
    }) 
    this.getMusicResult()
  }

  // 点击热门歌名
  handleClickHot = (value) => {
    this.setState({
      musicList: [],
      inputValue: value
    } ,() => {
      this.getMusicResult()
    }) 
  }

  // 获取默认搜索关键词
  getSearchDefault = () => {
    try {
      (
        async () => {
          const res = await fetch(SEARCH_DEFAULT)
          const data = await res.json()
          if (data.code == 200) {
            this.setState({
              inputValue: data.data.realkeyword
            })
          }
        }
      )()
    } catch(err) {
        console.log(err)
    }
  }


  // 获取关键词搜索的歌单列表
  getMusicResult = () => {
    try {
      (
        async () => {
          const _this = this
          const res = await fetch(
            SEARCH_KEYWORD({
              keywords: _this.state.inputValue,
              limit: 10,
              offset: this.state.page,
              type: 1  
            }), 
            {
              method: 'GET'
            }
          )
          const data = await res.json()
          if (data.code == 200) {
            if(data.result.songs) {
              this.state.page++
              this.setState({
                musicList: this.state.musicList.concat(data.result.songs)
              })
            } else {
              this.setState({
                loading: false
              })
            }
          }
        }
      )()
    } catch(err) {
        console.log(err)
    }
  }



  // 热门搜索面板
  renderKeyword = () => (
    <View>
      <TouchableOpacity style={styles.keyword} onPress={this.handleGetMusic}>
          <Text style={{fontSize: 16}}>搜索：{ this.state.inputValue }</Text>
      </TouchableOpacity>
    </View>
  )

  // 列表底部触底控件
  renderFooterComponent = () => {
      return  this.state.loading ? 
      <LoadMore text="点击加载更多" click={this.getMusicResult}/>
      :
      <LoadMore text="真的没有啦"/>
  }
  
  // 搜索结果列表
  renderMusicList = () => (
    <FlatList data={this.state.musicList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <MusicItem data={item} navigation={this.props.navigation}/>}
        refreshing={true}
        ListEmptyComponent={this.renderHotMusic()}
        ListHeaderComponent={this.renderKeyword()}
        ListFooterComponent={this.state.musicList.length > 0 && this.renderFooterComponent()}
    />
  )
  // 热门搜索歌名
  renderHotMusic = () => {
    if(this.state.hotMusic && this.state.hotMusic.length > 0) {
      return <HotMusicName data={this.state.hotMusic} hotValue={this.handleClickHot}/>
    } else {
      return null
    }
    
  }

  render(){
    return (
      <View style={styles.container}>
          {this.renderMusicList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: "flex-start",
      backgroundColor: '#fff'
    },
    keyword: {
      height: 50,
      width: '100%',
      paddingTop: 15,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,.1)'
    }
})