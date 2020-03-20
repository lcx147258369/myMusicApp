import React, { PureComponent } from 'react';
import Video from 'react-native-video';
import {View} from 'react-native';
import { connect } from 'react-redux';
import { MUSIC_PLAY_URL } from '../../api/index';
import { setPlayMusic } from '../../redux/actions';
import { transTime } from '../../unit/unit';

class Player extends PureComponent {
    state = {
        musicUrl: ''
    }

    componentWillReceiveProps(nextProps) {
        const { currentPlayId, currentPlay } = this.props
        const nextPlayId = nextProps.currentPlayId
        const nextCurrentPlay = nextProps.currentPlay
        if (currentPlayId !== nextPlayId) { // 当前的播放id不等于下一个播放的id 获取新的id播放地址
            this.getMusicUrl(nextPlayId)
        }
        if (currentPlay.ff !== nextCurrentPlay.ff) {  // 快进，快退操作
            this.player.seek(nextCurrentPlay.ff)
        }
    }
    getMusicUrl = id => {
        try {
            (async () => {
                const res = await fetch(MUSIC_PLAY_URL + id);
                const json = await res.json();
                this.setState({
                    musicUrl: json.data[0].url
                })
            })()
        } catch (err) {
           console.log(err)
        }
    }

    handleLoadStart = () => {
       
    }

    handleErro = () => {
        alert('出错啦')
    }

    // 加载事件触发后执行操作
    handleLoad = ({duration}) => {
        
        this.props.dispatch(setPlayMusic({
            duration,               // 歌曲长度
            playTime: transTime(duration), // 歌曲时间
            playing: true
        }))
        
    }

    // 进度事假触发后设置进度条和时间
    handleSetProgress = (time) => {
        const { duration } = this.props.currentPlay;
        this.props.dispatch(setPlayMusic({
            currentTime: transTime(time.currentTime),
            sliderProgress: (time.currentTime / duration)
        }))
    }

    render() {
        const { musicUrl } = this.state
        const { currentPlay } = this.props
        return(
            musicUrl ?
            (<Video
                source={{uri: musicUrl}}     // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}
                rate={1.0}                              // 0 is paused, 1 is normal.
                volume={1.0}                            // 0 is muted, 1 is normal.
                muted={false}                           // Mutes the audio entirely.
                resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                repeat={true}                           // Repeat forever.
                playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                style={{width: 0, height: 0}}
                onLoad={this.handleLoad}
                onProgress={this.handleSetProgress}
                paused={currentPlay && !currentPlay.playing}
                onLoadStart={this.handleLoadStart}
                onError={this.videoError}    
            />) : null
        )
    }
}

const mapStateToProps = ({currentPlay}) => ({
    currentPlayId: currentPlay.id,
    currentPlay
})

export default connect(mapStateToProps)(Player)
// export default Player