
      //格式化歌词文件
	  // @lrc 歌词文本
	  // return => [{t:Time,c:Content},{...}]
     function Lrcsplit(lrc) {
        let lrcs = lrc.split('\n'),olrcms = [];
        for (let i in lrcs) { //遍历歌词数组
          lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
          let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
          let s = t.split(":"); //分离:前后文字
          if (isNaN(parseInt(s[0]))) { //不是数值
            for (let i in lrcs) {
              if (i != "ms" && i == s[0].toLowerCase()) {
                lrcs[i] = s[1];
              }
            }
          } else { //是数值
            let arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个

            let start = 0;
            for (let k in arr) {
              start += arr[k].length; //计算歌词位置
            }

            var content = lrcs[i].substring(start); //获取歌词内容
            if (content == '') {
              continue
            }
            for (let k in arr) {
              let t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
              let s = t.split(":"); //分离:前后文字
              if ((parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3) == 0) {
                continue
              }
              olrcms.push({ //对象{t:时间,c:歌词}加入ms数组
                t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
                c: content
              });

            }
          }
        }
        return olrcms
      }
	  
	  function makeLrcObj(lrc, other) {
        let oLRC = {
          offset: -200, //时间补偿值，单位毫秒，用于调整歌词整体位置
          ms: [], //歌词数组{t:时间,c:歌词}
          tran: false,
          yrc: false,
          ytlrc: false

        },norLRC = Lrcsplit(lrc),tranLRC;
        
        for(let i in other){
          let element = other[i]

          if (element == null) {continue}

          if(i=='ytlrc'&& element!=null){
            tranLRC = Lrcsplit(element)
            
            for(let num in tranLRC){//让有翻译的歌词自己循环一遍自己在哪
              let objNum = oLRC['yrc'].findIndex(o => o.t == tranLRC[num].t)
              if (objNum!=-1) oLRC['yrc'][objNum][i+"C"]=tranLRC[num].c
            }
          }

          if(i == 'yrc' && other[i]!=null){
            
            oLRC[i] = yrcSplit(other[i])
            continue
          }
          tranLRC = Lrcsplit(element)
          for(let num in tranLRC){//让有翻译的歌词自己循环一遍自己在哪
            let objNum = norLRC.findIndex(o => o.t == tranLRC[num].t)
            if (objNum!=-1) norLRC[objNum][i+"C"]=tranLRC[num].c
          }
            oLRC.tran = true

        }

      oLRC.ms =norLRC

        oLRC.ms.sort(function (a, b) { //按时间顺序排序 
          return a.t - b.t;
        });
        return oLRC;

      }

/**
 * 解析YRC格式的歌词文件为JavaScript对象
 * @param {string} content 要解析的YRC格式的字符串
 * @returns {Array} 包含所有句的JavaScript对象数组
 */
 function yrcSplit(content) {
  //若内容未定义，则返回空数组
  if (content == undefined) {
    return [];
  }
  let lrcs = content.split('\n');
  let yrcs = [];

  let 合并单字次数 = 0 //提供打印台提示
  
  //解析每一句
  for (let i = 0; i < lrcs.length; i++) {
    const item = lrcs[i];

    //创建一个空对象，用于存放当前句的信息
    let yrc = {
      t: undefined, //开始时间
      edt: undefined, //结束时间
      c: undefined,//歌词内容
      playing: false,
      index: 0,
    }

    //分离出时间信息，并转换为秒
    let timeInfor = item.substring(item.indexOf("[") + 1, item.indexOf("]")).split(',');
    yrc.t = Number(timeInfor[0]) / 1000;
    yrc.edt = Number(timeInfor[1]) / 1000;

    //若时间信息不合法，将跳过该句
    if (isNaN(yrc.t) || isNaN(yrc.edt)) {
      continue;
    }

    //寻找歌词内容
    let arr = item.match(/\[[1-9]\d*,[1-9]\d*]/g);
    if (!arr) {
      continue;
    }

    //去除时间信息，获取歌词内容
    let c = item.substring(arr[0].length).trim();
    let c_contentArrays = [];


    //分离成单个字或词，并解析时间信息
    let splitcs = c.split(/(\([1-9]\d*,[1-9]\d*,\d*\)[^\(]*)/g);
    for (let a = 0; a < splitcs.length; a++) {

      const splitc = splitcs[a];

      // if (splitc == '') {
      //   continue;
      // }

      //创建一个对象，用于存放当前字或词的信息，并添加到当前句的歌词内容中
      let contentObj = {
        t: undefined, //开始时间
        dur: undefined, //持续时间
        originDur: undefined,
        str: '',//字或词的文本内容
        shine: '',
        progress: 0
      }

      //提取时间和文本信息，并转换为秒
      let time = splitc.match(/\([1-9]\d*,[1-9]\d*,\d*\)/);
      if (!time) {
        continue;
      }
      let timeArray = time[0].slice(1, -1).split(',');
      contentObj.t = Number(timeArray[0]) / 1000;
      contentObj.dur = Number(timeArray[1]) / 1000;
      contentObj.originDur = contentObj.dur
      contentObj.str = splitc.slice(time[0].length);

      if(contentObj.dur >= 2){ //单独将唱的久的歌词拆出来，加特效
      contentObj.shine = 'long'
      c_contentArrays.push(contentObj);

      continue
    }

    if(contentObj.dur >= 1){ //单字过长歌词，导致歌词显示进度不正常
      c_contentArrays.push(contentObj);
      continue
    }
      let last_c= c_contentArrays[c_contentArrays.length-1]
      // if(last_c){

      //   //如果与上一个字衔接
      //   if(last_c.dur + last_c.t == contentObj.t ){
      //     //&& last_c.originDur == contentObj.dur
      //     last_c.dur += contentObj.dur
      //     last_c.str += contentObj.str;
      //     合并单字次数++ 
      //     continue
      //   }
      // }
      c_contentArrays.push(contentObj);
    }

    yrc.c = c_contentArrays;

    yrcs.push(yrc);
  }
  console.log('合并' + 合并单字次数+ '次')

  return yrcs;
}



  export default {
	  Lrcsplit,
	  makeLrcObj
  }