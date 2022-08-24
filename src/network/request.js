import axios from 'axios'

export function request(config) {
    axios.defaults.withCredentials = true;
    const instance = axios.create({
        baseURL: '/api/', 
        timeout: 100000
    })

    instance.interceptors.request.use(config=>{
        return config
    }, err =>{
        console.log(err)
        return err
    })

    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err)
        return err
    })

    return instance(config)
}