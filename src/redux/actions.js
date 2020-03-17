export const TYPE = {
    SET_PLAY_ID: 'SET_PLAY_ID',
    SET_PLAY_MUSIC: 'SET_PLAY_MUSIC',
    SET_PLAY_VIDEO: 'SET_PLAY_VIDEO'
}

// 设置播放歌曲的id
export const setPlayId = id => ({
    type: TYPE.SET_PLAY_ID,
    id
})

// 设置播放歌曲详情
export const setPlayMusic = music => ({
    type: TYPE.SET_PLAY_MUSIC,
    music
})

// 设置播放video详情
export const setPlayVideo = video => ({
    type: TYPE.SET_PLAY_VIDEO,
    video
})

