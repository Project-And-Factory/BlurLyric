import axios from 'axios'
import message from '../js/message.js'

export function request(config,num) {
    axios.defaults.withCredentials = true;
    const instance = axios.create({
        baseURL: '/api/', 
        // baseURL: 'http://web.blurlyric.app/',
        // baseURL: '/api/',
        timeout: 10000,
    })

    instance.interceptors.request.use(config=>{
        return config
    }, err =>{
        console.log(err)
        if(num == 5){
            return err
        }
        if(num != undefined)
        {num = 0} else {
            num++
        }
        message.create('网络链接失败，尝试重连（'+num+'/5)')
        request(config,num)

    })

    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err)
        return err
    })

    return instance(config)
}