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
import message from './message.js'

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
    if ( (Data.song.netea.freeTrialInfo !=null) && Data.song['unblock'].url !=null) {
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
            functions:()=>{}
        },
        lyric: {},
    }
    //同步音乐歌词
    await reTools.getData('/lyric/new', {
        id: id
        }).then(r => {
          if(r.lrc.lyric == undefined){
            Data.lyric=lyric.makeLrcObj('[0]无歌词，请欣赏')
          }
          Data.lyric = lyric.makeLrcObj(r.lrc.lyric, {
            tran: (r.tlyric)?r.tlyric.lyric:null,
            roma: (r.romalrc)?r.romalrc.lyric:null,
            yrc: (r.yrc)?r.yrc.lyric:null,
            ytlrc: (r.ytlrc)?r.ytlrc.lyric:null
          })
        // if (r.lrc.lyric && r.tlyric) {

        // } else {
        //     Data.lyric = lyric.makeLrcObj(r.lrc.lyric)
        // }
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
    

        if(Data.song.netea.br == 0){
          if(Data.song['unblock'].url != null){
            Data.song.functions = ()=>{
            message.create('BlurLyric 正在调用 网易云解灰Api 更换音源')}
            Data.song.use = 'unblock'
          }
          if(Data.song['unblock'].url == (null || undefined)){
            
            // Data.song.use = 'next'
            Data.song.functions = ()=>{
              message.create('网易云音乐音源与网易云解灰Api均无音源，正在下一首')
              app.nextMusic()
            }
            
          }
        } else {
          if(Data.song.netea.freeTrialInfo !=null && Data.song['unblock'].url != (null || undefined)){
            Data.song.functions = ()=>{message.create('BlurLyric 正在调用 网易云解灰Api 更换VIP音源')}
            Data.song.use = 'unblock'
          } else if (Data.song.netea.freeTrialInfo !=null){
            Data.song.functions = ()=>{message.create('BlurLyric 无法调用 网易云解灰Api， 正在试听网易云试听音频')}
          }
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
async function downloadURL(url,song,cache){
  console.log(10);
  let name = ''
  for (let num in song.ar) {
      name += song.ar[num].name;
      if (song.ar.length - num > 1) {
          name += ' & '
      }
  }
  let response = await fetch(url)
  let blob = await response.blob();
  let objectUrl = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = objectUrl;

  a.download = ((song.name) + ' - ' + (name) + ((cache.song[cache.song.use].br < 900000)?'.mp3':'.flac'));
  a.click();
  a.remove()
}