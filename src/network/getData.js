import request from './request'

async function getData(url,params) {
    return request.request({
        url: url,
        params: params,
    })
}
async function postData(url,params) {
    return request.request({
        url: url,
        method: 'post',
        data: params
    })
}

export default {
    getData,
    postData
}