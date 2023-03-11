
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
          if(i == 'yrc' && other[i]!=null){
            
            oLRC[i] = yrcSplit(other[i])
            // console.log();
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
      console.log(oLRC);

        oLRC.ms.sort(function (a, b) { //按时间顺序排序 
          return a.t - b.t;
        });
        return oLRC;

      }

      function yrcSplit(content) {
        if(content == undefined) {
          return
        }
        let lrcs = content.split('\n')
        let yrcs = [
    
        ]

        //解析一句
        for (let i = 0; i < lrcs.length; i++) {
          const item = lrcs[i];
          
          let yrc = {
            t: undefined,
            edt: undefined,
            c: undefined
          }
          //分离出时间
          let timeInfor = (item.substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"))).split(',');
          yrc.t = Number(timeInfor[0])/ 1000
          yrc.edt = Number(timeInfor[1])/ 1000

          if (yrc.t == NaN || yrc.edt == NaN){
            continue //若时间不合格将跳过
          } 
          
          //开始寻找主词内容
          
          let arr = item.match(/\[([1-9]\d*,[1-9]\d*)]/g);
          if(!arr) continue
          
          //去除本句[...]内容
          let c = item.substring(arr[0].length); //获取歌词内容
          let c_contentArrays = []
          
          
          //分离成单字
          let splitcs = c.split(/(\([1-9]\d*,[1-9]\d*,\d*\)[^\(]*)/g)
          for (let a = 0; a < splitcs.length; a++) {

            const splitc = splitcs[a];

            if (splitc == '') {
             continue 
            }
          //解析单字时间

            let time =  splitc.match(/([1-9]\d*,[1-9]\d*,\d*)/)
            if(!time){
              continue
            }
            let timeArray = (time[0]).split(',')
          
            let contentArray = {
              t: 0,
              dur: 0,
              str: ''
            }

            contentArray.t = Number(timeArray[0])/1000;
            contentArray.dur = Number(timeArray[1])/1000
            contentArray.str = splitc.match(/\([1-9]\d*,[1-9]\d*,\d*\)(.*)/)[1]
            c_contentArrays.push(contentArray)
          }
          yrc.c = c_contentArrays
          
          yrcs.push(yrc)
        }
        // console.log(yrcs);
        return yrcs
      }
  export default {
	  Lrcsplit,
	  makeLrcObj
  }