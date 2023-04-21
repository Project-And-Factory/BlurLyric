<script>
    import app from "../main";

    import reTools from '../network/getData'
  import message from '../js/message'
  import cookies from 'js-cookie'
  import QRCode from 'qrcode'
    export default{
        data(){
            return{
                title: '登录 网易云音乐账号',
                message: '等待中'
            }
        },
        methods:{

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
                  this.message = '需要使用手机版网易云音乐扫码认证'
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
this.close()
          setTimeout(() => this.checkLogin(), 1000);
        }
      },
      async 扫码(){
        let unikey = null
        await reTools.getData('/login/qr/key',{
          timetamp: (Number(new Date()))} ).then((r)=>{
          unikey = r.data.unikey
        })

        await reTools.getData('/login/qr/create',{
          key: unikey,
          timetamp: (Number(new Date()))
        }).then((r)=>{
        document.querySelector('.qrcodeOutbox').innerHTML = ''

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
          this.message=('登录成功')
          document.cookie +=statusRes.cookie
          setTimeout(() => {
                  this.checkLogin()
                }, 3000);
          localStorage.setItem('cookie', statusRes.cookie)
        }
      }, 5000)
    }
        },
        props: {
            display: String,
            close: Function
        },
        watch:{
            display:{
                async handler(newVal, oldVal) {
                    if(newVal == 'display'){
                        this.$nextTick(()=>{
                            this.扫码()
                        })
                    }
                }
            }
        },
        created(){

        }
    }

</script>

<template>
    <div :class="['background',display]">
        <div class="loginCard">
            <div class="title">
                <div @click="close()" class="x">x</div>
            </div>
            <h1 v-html="title"></h1>
            <p>打开网易云音乐扫码</p>
            <div class="qrcodeOutbox"></div>
            <div :class="['message',(message=='登录成功')?'ok':'']">{{message}}</div>
        </div>
    </div>
</template>
<style  scoped>
    .background{
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 9999;
        backdrop-filter: blur(calc(2vw + 2vh));
        transition: all .6s cubic-bezier(.3, .5, .2, 1);
    }
    .background.hidden{
        backdrop-filter: blur(0px);pointer-events: none;
    }
    .loginCard{
        margin: auto auto;
        width: 250px;
        overflow: hidden;
        height: 360px;
        padding: 16px;
        background: white;
        border-radius: 13px;
        transition: all 1s cubic-bezier(.3, .5, .2, 1), opacity .3s, transform 1s cubic-bezier(.5, .2, .1, 1);

    }
    .hidden .loginCard{
        transform: translateY(-50%) ;
        scale: .5;
        opacity: 0;
    }

    .title{
        height: 16px;
        font-size: 16px;
        display: flex;
        align-items: center;

    }
    .x{
        width: 15px;
        height: 15px;
        line-height: 12.5px;
        cursor: pointer;
    }
    .qrcodeOutbox{
        width: fit-content;
        height: fit-content;
        overflow: hidden;
        border-radius: 10px;
        margin: 30px auto;
        box-shadow: 0px 0px 10px #0001;
    }
    .message{
        background: #00000006;
        margin: auto -16px 6px -16px;
        padding: 16px;
        background-image: linear-gradient(90deg,
        rgb(0,0,0,.03) 0%,
        rgb(0,0,0,.03) 33.3%,
        rgb(0,0,0,.06) 66.6%,
        rgb(0,0,0,.03) 66.61%,
        rgb(0,0,0,.03) 100%
        );
        background-size: 300% 100%;
        animation: wait 5s infinite ;
    }

    @keyframes wait {
        from{
            background-position: 100% 0%;
        }
        to{
            background-position: 0% 0%;

        }
    }
    .message.ok{
        background-image: none;

        animation: ok .5s ;

    }
    
    @keyframes ok {
        from{
            background-color: #50ff50;
        }
        to{
            background-color: rgb(0,255,0,.03);


        }
    }
</style>