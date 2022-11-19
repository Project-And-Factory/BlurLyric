
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
	  
	  function makeLrcObj(lrc, tran) {
        let oLRC = {
          offset: -200, //时间补偿值，单位毫秒，用于调整歌词整体位置
          ms: [], //歌词数组{t:时间,c:歌词}
          tran: false
        },norLRC = Lrcsplit(lrc),tranLRC;
        if (tran) {
          tranLRC = Lrcsplit(tran)
		  for(let num in tranLRC){//让有翻译的歌词自己循环一遍自己在哪
			  let objNum = norLRC.findIndex(o => o.t == tranLRC[num].t)
			  if (objNum!=-1) norLRC[objNum]["tranC"]=tranLRC[num].c
		  }
          oLRC.tran = true
        }
		oLRC.ms =norLRC

        oLRC.ms.sort(function (a, b) { //按时间顺序排序 
          return a.t - b.t;
        });
        return oLRC;
      }
  export default {
	  Lrcsplit,
	  makeLrcObj
  }