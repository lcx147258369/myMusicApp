const BASE_URL = 'http://192.168.0.114:3000'

// 热门搜索接口
export const SEARCH_HOT = BASE_URL + '/search/hot'

export const SEARCH_DEFAULT = BASE_URL + '/search/default'

export const SEARCH_KEYWORD = (params) => {
    return BASE_URL + '/search?' + 
          'keywords=' + params.keywords +
          '&limit=' + params.limit +
          '&offset=' + params.offset +  
          '&type=' + params.type
}

export const MUSIC_DETAILS = BASE_URL + '/song/detail?ids='

export const MUSIC_PLAY_URL = BASE_URL + '/song/url?id='
