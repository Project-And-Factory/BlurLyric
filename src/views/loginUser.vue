<template>
    <h2>登录你的网易云音乐账号</h2>
    <p>请在下方输入你的账号/邮箱以及密码</p>

    <input v-model="phone" placeholder="手机号/邮箱"><br>
    <input v-model="password" type="password" placeholder="密码">

    <div class="linkbox bigger">
      <a style="user-select:none" @click="clickToLogin()">点击登录</a>
      <a @click="扫码()">或使用扫码登录</a>
    </div>
    <p style="color: red">{{message}}</p>

    <div  v-bind:class="(code == '-462')?'true':'' + 'qrcodeOutbox'"></div>
</template>
<style>

  input {
    outline: none;
    padding: 8px;
    font-size: 16px;
    margin-bottom: 20px;
    border-radius: 7px;
    border: 0;
    background: #00000010;
  }
</style>
<script>
  import reTools from '../network/getData'
  import message from '../js/message'
  import cookies from 'js-cookie'
  import QRCode from 'qrcode'
  export default {
    name: 'loginUser',
    data() {
      return {
        phone: '',
        password: '',
        message: '',
        code: null
      }
    },
    methods: {
      clickToLogin() {
        if (!this.phone || !this.password) {
          this.message = '请先填写信息'
          return false
        }
        let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        let isOk = reg.test(this.phone)

        if (isOk) {
          document.querySelector('.qrcodeOutbox').innerHTML=''
          reTools.getData('/login/email', {
            email: this.phone,
            password: this.password,
          }).then(res => {
            console.log(res);
            if (res.code == 200) {
              document.cookie = res.cookie
              this.$router.push({
                name: 'muLib'
              })
              setTimeout(() => {
                this.$router.go(-1)
                this.checkLogin()


              }, 3000);
            } else if (res.code == 502) {
              message.create(res.msg)
            } else if (res.code == 400) {
              message.create('账号错误')
            }
          })
        } else {
          reTools.getData('/login/cellphone', {
            phone: this.phone,
            password: this.password,
          }).then(res => {
            console.log(res);
            this.code = res.code
            switch (res.code) {
              case 200:
                message.create('登录成功, 即将刷新页面')
                document.cookie += res.cookie;
                setTimeout(() => {
                  this.$router.go(-1)
                  this.checkLogin()

                }, 3000);
                break;

              case 502:
                message.create(res.msg)

                break;
              case 400:
                message.create('账号错误')

                break;
              case "ERR_BAD_REQUEST":
                
                if(res.response&&res.response.data&&res.response.data.code == '-462'){
            this.code = res.response.data.code
                  
                  this.扫码()
                  this.message = '请使用网易云手机版扫码验证后再使用'
                } else {
                  message.create('Error ERR_BAD_REQUEST ，请联系管理员 ' + res.request.response.message)
                }

                break;
            }

          })
        }
      },
      checkLogin() {
        if (this.$parent.$parent.data.user.profile == null) {
          this.$parent.$parent.loginInfor();

          setTimeout(() => this.checkLogin(), 1000);
        }
      },
      async 扫码(){
        document.querySelector('.qrcodeOutbox').innerHTML = ''
        let unikey = null
        await reTools.getData('/login/qr/key',{
          timetamp: (Number(new Date()))} ).then((r)=>{
          unikey = r.data.unikey
        })

        await reTools.getData('/login/qr/create',{
          key: unikey,
          timetamp: (Number(new Date()))
        }).then((r)=>{
          QRCode.toCanvas(r.data.qrurl,{ errorCorrectionLevel: 'L' },(err,canvas)=>{
            document.querySelector('.qrcodeOutbox').appendChild(canvas)
          })
        })


        let timer = setInterval(async () => {
        const statusRes = await reTools.getData('/login/qr/check',{
          // key: '"'+unikey + '"',
          key: unikey,
          timetamp: (Number(new Date()))
        })
        console.log(unikey,statusRes);
        if (statusRes.code === 800) {
          this.message=('二维码已过期,请重新获取')
          document.querySelector('.qrcodeOutbox').innerHTML = ''
          clearInterval(timer)
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer)
          this.message=('授权登录成功')
          document.cookie +=statusRes.cookie
          localStorage.setItem('cookie', statusRes.cookie)
        }
      }, 5000)
    }
    },

  }
</script>