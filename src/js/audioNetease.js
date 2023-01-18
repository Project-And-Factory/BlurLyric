export default {
    requireId,
    requirePersonalFM,
    requireURL,
    downloadID,
    downloadURL
}


//用于网络请求
import reTools from '../network/getData'
import lyric from './lyric.js'
import app from '../main.js'

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
 async function requireURL(id) {
  let Data = {
    song: {
        netea: {},
        unblock: {},
        use: 'netea',
    },
    lyric: {},
}
  await reTools.getData('/song/url', {
    id: id
  }).then(r => {
    Data.song.netea = r.data[0]

  })
await reTools.getData('/blurlyric/unblockmusic', {
    id: id
  }).then(res => {
    Data.song.unblock = res
    // (Data.song.netea.br < Data.song.unblock.br) ||
    if ( (Data.song.netea.freeTrialInfo !=null)) {
      Data.song.use = 'unblock'
    }

  })
  Data.song['src']=  Data.song[Data.song.use].url
  return Data
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
            use: 'netea',
        },
        lyric: {},
    }
    //同步音乐歌词
    await reTools.getData('/lyric', {
        id: id
        }).then(r => {
        if (r.lrc.lyric && r.tlyric) {
            Data.lyric = lyric.makeLrcObj(r.lrc.lyric, {
              tran: r.tlyric.lyric,
              roma: r.romalrc.lyric
            })
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
        Data.song.unblock = res
    
        if (Data.song.netea.br == 0 || Data.song.netea.freeTrialInfo !=null) {
          Data.song.use = 'unblock'
        }
    
      })
      Data.song['src']=  Data.song[Data.song.use].url
      return Data
}

async function downloadID(id){
  requireURL(id).then(async (data) => {
      let response = await fetch(data.song[data.song.use].url)
      let blob = await response.blob();
      let objectUrl = window.URL.createObjectURL(blob);

      let a = document.createElement("a");
      a.href = objectUrl;

      let song  = null 
      await reTools.getData('/song/detail', {
        ids: id,
        timetamp: (Number(new Date()))
        }).then(r => {
          song = r.songs[0]
        })
      
      let name = ''
      for (let num in song.ar) {
          name += song.ar[num].name;
          if (song.ar.length - num > 1) {
              name += '&'
          }
      }
      a.download = song.name + ' - ' + name + '.mp3';
      a.click();
      a.remove()
  })
}
async function downloadURL(url){
  // window.location.href = url
  let song =  app.data.player.tracks[app.data.player.trackNum]
  
  let name = ''
  for (let num in song.ar) {
      name += song.ar[num].name;
      if (song.ar.length - num > 1) {
          name += '&'
      }
  }
  let response = await fetch(url)
  let blob = await response.blob();
  let objectUrl = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = objectUrl;

  a.download = song.name + ' - ' + name + (app.data.player.musicCache[app.id].song[app.data.player.musicCache[app.id].song.use].br < 900000)?'.mp3':'.flac';
  a.click();
  a.remove()
}