import {commonParams, ERR_OK} from './config'
import axios from 'axios'
import {Base64} from 'js-base64'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric(){
    if(this.lyric){
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve,reject) =>{
      getSongLyric(this.mid).then((res)=>{
        if(res.retcode === ERR_OK){
          this.lyric =Base64.decode(res.lyric)
          resolve(this.lyric)
        }else{
          reject('no lyric')
        }
      })
    })
  }
}
export function createSong(song){
  return new Song({
    id:song.id,
    mid:song.mid,
    singer:singerName(song.singer),
    name:song.name,
    album:song.album.name,
    duration:song.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg?max_age=2592000`,
    url:`http://isure.stream.qqmusic.qq.com/${song.mediaUrl}`
  })
}

export function createSearchSong(song){
  return new Song({
    id:song.songid,
    mid:song.songmid,
    singer:singerName(song.singer),
    name:song.songname,
    album:song.albumname,
    duration:song.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`,
    url:`http://isure.stream.qqmusic.qq.com/${song.mediaUrl}`
  })
}

 function singerName(singer){
  if(!singer){
    return ''
  }
  let names = [];
  singer.forEach((item)=>{
    names.push(item.name)
  })
  return names.join("/")
}

function getSongLyric(songMid){
  // const url="/api/getSongLyric";
  // const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  const url ='http://47.102.197.42/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const data=Object.assign({},commonParams,{
    songmid:songMid,
    g_tk_new_20200303:5381,
    g_tk:5381,
    hostUin:0,
    format:'json',
    notice:0,
    platform:'yqq.json',
    needNewCode:0
  })

  return   axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

