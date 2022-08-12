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
  transform: translate(0px, -177px);
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
        reTools.getData('/login/status', {
          email: this.phone,
          password: this.password,
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            document.cookie = res.cookie
            this.$router.push({name:'muLib'})
            setTimeout(() => {
              location.reload()  
            }, 1000); 
          } else if (res.code == 502) {
            this.message= res.msg
          } else if (res.code == 400) {
            this.message= '账号错误'
          }
        })
      } else {
        reTools.getData('/login/cellphone', {
          phone: this.phone,
          password: this.password,
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.message= '登录成功, 即将刷新页面'
          document.cookie += res.cookie
            setTimeout(() => {
              this.$router.go(-1)
              this.$parent.loginInfor()
            }, 3000);
          } else if (res.code == 502) {
            this.message= res.msg
          } else if (res.code == 400) {
            this.message= '账号错误'
          } else if (res.code == "ERR_BAD_REQUEST"){
            this.message = JSON.parse(res.request.response).message

          }
        })
      }
    }
  },
        
}
</script>