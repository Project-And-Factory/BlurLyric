const express = require('express');
const router = express.Router()
const axios = require('axios')
const user = require('./user.js');


router.get('/createUser',(req,res)=>{

    user.createUser((data)=>{
        jsonTool('200',data,req,res)
    })
    
})

router.get('/getUser',(req,res)=>{
    if (!req.query.id) {
        jsonTool('200',{
            "msg": '请填入ID',
        },req,res)
        return
    }
      
    user.getUser(req.query.id,(data)=>{
        jsonTool('200',data.str,req,res)
    })
})

router.get('/writeUser',(req,res)=>{
    if (!req.query.id) {
        jsonTool('405',{
            "msg": '请填入ID',
        },req,res)
        return
    }
      
    user.getUser(req.query.id,(data)=>{
        jsonTool('200',data.str.safeData,req,res)
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
module.exports = router