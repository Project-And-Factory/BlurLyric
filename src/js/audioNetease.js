export default {
    requireId,
    requirePersonalFM
}


//用于网络请求
import reTools from '../network/getData'
import lyric from './lyric.js'

async function requirePersonalFM() {
  let res
  await reTools.getData('/personal_fm',{
    timetamp: (Number(new Date()))
  }).then(r=>{res=r.data})
  for (let num = 0; num < res.length; num++) {
    res[num]['al'] = res[num].album
    res[num]['ar'] = res[num].artists
  }

  return res
}

/**
 * 请求网易云ID的音乐
 * 
 * @param {number} id
 */
async function requireId(id) {
    let Data = {
        song: {
            netea: {},
            unblock: {},
            use: 'netea'
        },
        lyric: {},
    }
    //同步音乐歌词
    await reTools.getData('/lyric', {
        id: id
        }).then(r => {
        if (r.lrc.lyric && r.tlyric) {
            Data.lyric = lyric.makeLrcObj(r.lrc.lyric, r.tlyric.lyric)
        } else {
            Data.lyric = lyric.makeLrcObj(r.lrc.lyric)
        }
    })
    
    await reTools.getData('/song/url', {
        id: id
      }).then(r => {
        Data.song.netea = r.data[0]

      })
  await reTools.getData('/blurlyric/unblockmusic', {
        id: id
      }).then(res => {
        if (Data.song.netea.br < Data.song.unblock.br || Data.song.netea.freeTrialInfo !=null) {
          Data.song.unblock = res
          Data.song.use = 'unblock'
        }
      })
    return Data
}