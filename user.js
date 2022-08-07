const fs = require('fs')
const path = require('path')
var lastTime = +new Date()

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
        }
        fun({
            code: 'success',
            str: dataStr
        })
    })
}

async function createUser(callback) {

            if ((Date.now() - lastTime) < 5000) {
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
            fs.writeFileSync(path.join(__dirname, './data/user/' + id + '.json'),file.toString())

            callback(file)
}}

async function upsetConfig(config, callback) {

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
    writeJson: async function (text, callback) {
        let buffer = new Buffer(text.toString())
        await fs.writeFile(path.join(__dirname, file), buffer, {
            flag: 'a'
        }, (err, dataStr) => {
            if (err) {
                callback(err)
            }
            callback({
                code: 'ok',
            })
        })
    }
}

function dataJson(res) {
    return eval('(' + res + ')')
}