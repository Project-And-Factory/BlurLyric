const express = require('express');
const router = express.Router()
const axios = require('axios')
const user = require('./user.js');
const unblockmusic = require('@unblockneteasemusic/server');
const match = require('@unblockneteasemusic/server');

router.get('/createUser',(req,res)=>{

    user.createUser((data)=>{
        jsonTool('200',data,req,res)
    })
    
})

router.get('/unblockmusic',(req,res)=>{
    res.json(await match(req.query.id, ['kuwo', 'migu', 'kugou']))
})

router.get('/getUser',(req,res)=>{
    if (!req.query.id) {
        jsonTool('200',{
            "msg": '请填入ID',
        },req,res)
        return
    }
      
    user.getUser(req.query.id,(data)=>{
        jsonTool('200',data,req,res)
    })
})

router.get('/writeUser',(req,res)=>{
    console.log(req.query)
    if (!req.query.id||!req.query.res) {
        jsonTool('405',null,req,res)
        return
    }
    let dataSize = strSize(req.query.res)
    if(strSize(dataSize,'utf8')>8000000){
        jsonTool('405',{msg: '文件过大 (>8mb)'},req,res)
        return
    }
    user.upsetConfig(req.query,(data)=>{
        jsonTool('200',data,req,res)
    })
})

function jsonTool(code,data,req,res) {
    res.json({
        "code": code,
        "date": new Date(),
        "data": data,
        "ip": req.ip
    })
}
function strSize(str, charset) {
    let total = 0;
    charset = charset?.toLowerCase() || '';
    for (i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if (charset === 'utf-16' || charset === 'utf16') {
            total += charCode <= 0xffff ? 2 : 4;
        } else {
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    }
    return total;
}

module.exports = router