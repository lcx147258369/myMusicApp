import { combineReducers } from 'redux';
import { TYPE } from './actions';

// 当前播放的音乐数据
const currentPlay = (state = {}, action) => {
    switch (action.type) {
        case TYPE.SET_PLAY_ID:
            return {...state, id: action.id};
        case TYPE.SET_PLAY_MUSIC:
            return {...state, ...action.music};
        default: 
            return {...state};
    }
}

// 当前播放的视频数据
const currentPlayVideo = (state = {}, action) => {
    switch (action.type) {
        case TYPE.SET_PLAY_VIDEO:
            return {...state, ...action.video};
        default:
            return {...state};
    }
}


export default combineReducers({
    currentPlay,
    currentPlayVideo
})