<template>
  <div class="logincard">
  <h2>登录你的网易云音乐账号</h2><p>请在下方输入你的账号/邮箱以及密码</p>
  
  <input v-model="phone" placeholder="手机号/邮箱"><br>
  <input v-model="password" type="password" placeholder="密码">

    <div class="linkbox bigger">
      <a style="user-select:none" @click="clickToLogin()">点击登录</a>
    </div>
    <p style="color: red">{{message}}</p>
    </div>
</template>
<style>
.opes.loginUser{
  filter: blur(10px);

}
.logincard{
  position: absolute;
  backdrop-filter: blur(0px);
}
  input{
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

export default { 
  name: 'loginUser',
  data() {
    return {
      phone: '',
      password: '',
      message: ''
    }
  },
  methods: {
    clickToLogin(){
      if (!this.phone || !this.password) {
        this.message ='请先填写信息'
        return false
      }
      let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      let isOk = reg.test(this.phone)

      if (isOk) {
        reTools.getData('/login/email', {
          email: this.phone,
          password: this.password,
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            document.cookie = res.cookie
            this.$router.push({name:'muLib'})
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
          if (res.code == 200) {
            message.create('登录成功, 即将刷新页面')


          document.cookie += res.cookie;
          document.cookie == res.cookie

            setTimeout(() => {
              this.$router.go(-1)
              this.checkLogin()

            }, 3000);
          } else if (res.code == 502) {
            message.create(res.msg)
          } else if (res.code == 400) {
            message.create('账号错误')
          } else if (res.code == "ERR_BAD_REQUEST"){
            message.create('Error ERR_BAD_REQUEST ，请联系管理员' + JSON.parse(res.request.response).message)

          }
        })
      }
    },
    checkLogin(){
      if(this.$parent.$parent.data.user.profile == null){
        this.$parent.$parent.loginInfor();

        setTimeout(() => this.checkLogin(),1000);
      }
    }
  },
        
}
</script>