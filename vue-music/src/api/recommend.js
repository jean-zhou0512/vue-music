import {commonParams,options} from './config'
import jsonp from '../common/js/jsonp';
import axios from 'axios';

export function getDiscList(){

  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const url = 'http://47.102.197.42/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

  const data = Object.assign({},commonParams,{
    rnd:Math.random(),
    categoryId:10000000,
    sortId:5,
    ein:19,
    sin:0,
    platform:'yqq',
    hostUin:0,
    needNewCode:0,
    picmid:1,
    g_tk:5381,
    notice:0,
    format:'json',//将format从jsonp修改为json*!/
  });

  // return jsonp(url,data,options);
  return axios.get(url,{
    params:data
  }).then((res)=>{
      return Promise.resolve(res.data);
  })
}

export function getRecomSongs(dissid){
  // const url = '/api/getRecomSongs'
  //const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  const url = 'http://47.102.197.42/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  const data = Object.assign({},commonParams,{
    type:1,
    json:1,
    new_format:1,
    disstid:dissid,
    utf8:1,
    g_tk_new_20200303:5381,
    g_tk:5381,
    hostUin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq.json',
    needNewCode:0
  });
  return   axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}
