const fs = require('fs')
const path = require('path')
var lastTime = +new Date(),createNum = 0;

module.exports = {
    getUser,
    createUser,
    upsetConfig
};

async function getUser(id, fun) {
    await superTool.readJson('./data/user/' + id + '.json', (err, dataStr) => {
        if (err) {
            fun({
                code: 'error',
                message: '无法找到用户'
            })
            return
        }
        fun(dataStr)
    })
}

async function createUser(callback) {

            if ((Date.now() - lastTime) < 5000 && createNum != 0) {
                callback({
                    code: '405',
                    message: '请求太频繁'
                })
                console.log('阻止了一次过快的创建账号请求');
            } else{
            lastTime = Date.now()

            let id = randomID();

            console.log(id);
            let file = {
                id: id,
                config: {}
            }
            fs.writeFileSync(path.join(__dirname, './data/user/' + id + '.json'),JSON.stringify(file))

            callback(file)
}}

async function upsetConfig(query, callback) {
    let file = {
        id: query.id,
        config: dataJson(query.res)
    }

    superTool.writeJson('./data/user/' + file.id + '.json', file, (err, dataStr)=>{
        if (err) {
            callback(err);
        } else {

            callback(dataStr);
        }
        console.log(err,dataStr);
    })
}
function randomID() {
    return (30*(Math.random() * Math.random())).toString(16).substring(2);
}

var superTool = {
    readJson: async function (file, callback) {
        await fs.readFile(path.join(__dirname, file), 'utf8', (err, dataStr) => {
            if (err) {
                callback(err)
            }
            callback(null, dataJson(dataStr))
        })
    },
    writeJson: async function (file,text, callback) {
        let buffer = JSON.stringify(text)
        await fs.writeFile(path.join(__dirname, file), buffer, (err, dataStr) => {
            if (err) {
                callback(err,{})
            }
            callback(undefined,{
                code: 'ok',
            })
        })
    }
}

function dataJson(res) {
    return eval('(' + res + ')')
}