import React, { PureComponent } from 'react'
import { 
    View, 
    Text, 
    Button, 
    TextInput, 
    FlatList, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    ScrollView,
    Animated,
    Easing,
    ImageBackground,
} from "react-native";

import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Feather'
import color from '../../unit/color.js'
import { deviceW, deviceH } from '../../unit/unit'
import { connect } from 'react-redux'
import { MUSIC_DETAILS } from '../../api/index'
import { setPlayId, setPlayMusic } from '../../redux/actions';
import Player from './Player'
import { transTime } from '../../unit/unit'

class MusicPlay extends PureComponent  {
   static navigationOptions = (navigation) => ({
     header: null
   })

   constructor() {
       super();
       this.state = {
           details: {},      // 歌曲详情
       }
       this.animatedValue = new Animated.Value(0);
       this.animatedTop = new Animated.Value(0);
   }

   componentDidMount() {
        // this.animatedCircling()
        // const navigation = this.props.navigation
        // const id = navigation.getParam('id')
        const { currentPlayId, dispatch } = this.props
        this.getMusicDetails(currentPlayId)
   }

   // 获取music详情
   getMusicDetails = id => {
       try {
        (
            async () => {
                const res = await fetch(MUSIC_DETAILS + id);
                const data = await res.json()
                this.setState({
                    details: data.songs[0]
                })
            }
        )()
       } catch (err) {

       }
   }

   // 手动控制进度条控制
   handleSliderChange = value => {
       const { currentPlay, dispatch } = this.props;
       dispatch(setPlayMusic({
           sliderProgress: value,
           ff: currentPlay.duration * value   // 进度条控制播放进度
       }))
   }

   // 暂停/继续播放
   handlePlaying = playing => {
       this.props.dispatch(setPlayMusic({playing}))
   }

   // 磁碟旋转动画
   animatedCircling = () => {
       this.animatedValue.setValue(0)
       Animated.timing(this.animatedValue, {
           toValue: 1,
           duration: 12000,
           easing: Easing.linear
       }).start(() => this.animatedCircling());
   }

   // 歌词渲染模块
   renderLyric = () => (
     <View>
         <ScrollView>
            <Text style={{color: '#000000'}}>累了</Text>
         </ScrollView> 
     </View>
   )

   // 磁碟渲染模板
   renderCD = () => {
        const interpolatedAnimation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        const topAnimation = this.animatedTop.interpolate({
            inputRange: [0, 1],
            outputRange: [deviceH, 0]
        })
        const { details } = this.state
 
        return <View style={styles.cdContainer}>
                    <View style={{position: 'absolute', top: 0, left: 34, width: deviceW, alignItems: 'center', zIndex: 10}}>
                        <Image source={require('../../static/image/needle-ip6.png')} style={{width: 100, height: 140}}/>
                    </View>
                    <ImageBackground source={require('../../static/image/disc-ip6.png')} style={{width: deviceW - 40, height: deviceW - 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Animated.Image
                            source={{uri: details.al && details.al.picUrl + '?param=200y200'}}
                            style={[
                                { 
                                    width: deviceW - 152,
                                    height: deviceW - 152, 
                                    borderRadius: (deviceW -152) /2 
                                },
                                {
                                    transform: [
                                        {rotate: interpolatedAnimation}
                                    ]
                                }
                            ]}
                        />
                    </ImageBackground>
                    
                </View>
   }

   // 顶部自定义导航模板
   renderHeader = () => {
      const { details } = this.state
      return (
        <View style={styles.header}>
            <TouchableOpacity>
                <Icon name="chevron-left" size={28} color={color.white}/>
            </TouchableOpacity>
            <View style={styles.headerTitle}>
                <Text style={{color: color.white}} numberOfLines={1} ellipsizeMode={'tail'}>{ details.name }</Text>
                <Text style={{color: color.white, fontSize: 10}}>{ details.ar && details.ar.map(ar => ar.name).join('、') }</Text>
            </View>
            <TouchableOpacity>
                <Icon name="share-2" size={24} color={color.white}/>
            </TouchableOpacity>
        </View>
      )
    }

   render() {
     const { currentPlay } = this.props;
     const { details } = this.state;
     return(
       <View style={styles.container}>
            <Image style={{width: '100%', height: '100%', position: 'absolute', zIndex: 1, opacity: 0.8}}  blurRadius={8} source={{uri: (details.al && details.al.picUrl) + '?params=200y200'}}/>
            <View style={{zIndex: 5, flex: 1}}>
               { this.renderHeader() }
               { this.renderCD() }
               <View style={styles.topIconGroup}>
                    <TouchableOpacity>
                        <Icon name="heart" size={24} color={color.white}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="download-cloud" size={24} color={color.white}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="message-square" size={24} color={color.white}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="more-vertical" size={24} color={color.white}></Icon>
                    </TouchableOpacity>
               </View>
               <View style={styles.progress}>
                    <Text style={{color: color.white}}>{currentPlay.currentTime}</Text>
                    <Slider
                        style={{width: deviceW - 100}}
                        maximumTrackTintColor={color.white}
                        minimumTrackTintColor={color.theme}
                        trackStyle={{height: 2}}
                        value={currentPlay.sliderProgress}
                        onValueChange={this.handleSliderChange}
                    />
                    <Text style={{color: color.white}}>{currentPlay.playTime}</Text>
               </View>
               <View style={styles.playIconGroup}>
                   <TouchableOpacity>
                        <Icon name="repeat" size={24} color={color.white}/>
                   </TouchableOpacity>
                   <TouchableOpacity>
                        <Icon name="skip-back" size={24} color={color.white}/>
                   </TouchableOpacity>
                   {
                       currentPlay.playing ? (
                        <TouchableOpacity onPress={() => this.handlePlaying(false)}>
                            <Icon name="pause-circle"  size={48} color={color.white}/>
                        </TouchableOpacity>
                       ) : 
                       (
                        <TouchableOpacity onPress={() => this.handlePlaying(true)}>
                            <Icon name="play-circle"  size={48} color={color.white}/>
                        </TouchableOpacity>
                       )
                   }
                 
                   <TouchableOpacity>
                        <Icon name="skip-forward" size={24} color={color.white}/>
                   </TouchableOpacity>
                   <TouchableOpacity>
                        <Icon name="list" size={24} color={color.white}/>
                   </TouchableOpacity>
               </View>
            </View>
       </View>
     )
   }
}

const mapStateToProps = ({currentPlay}) => ({
    currentPlayId: currentPlay.id,
    currentPlay
})

export default connect(mapStateToProps)(MusicPlay)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent'
  },
  header: {
      height: 50,
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: 'rgba(245, 245, 245, 0.21)'
  },
  headerTitle: {
      width: '85%',
      justifyContent: 'center', 
      alignItems: 'center'
  },
  cdContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  topIconGroup: {
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-around',
      alignItems: 'center'
  },
  progress: {
      width: '100%',
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  playIconGroup: {
      flexDirection: 'row',
      height: 50,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20
  }
})