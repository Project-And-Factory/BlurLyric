import axios from 'axios'

export function request(config) {
    axios.defaults.withCredentials = true;
    const instance = axios.create({
        baseURL: 'http://localhost:18775/',
        timeout: 10000
    })

    instance.interceptors.request.use(config=>{
        return config
    }, err =>{
        console.log(err)
    })

    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err)
    })

    return instance(config)
}