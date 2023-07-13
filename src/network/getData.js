import request from './request'

async function getData(url,params) {
    return request.request({
        url: url,
        params: params,
    })
}
async function postData(url,params,headers) {
    return request.request({
        url: url,
        method: 'post',
        data: params,
        headers: headers
    })
}

export default {
    getData,
    postData
}