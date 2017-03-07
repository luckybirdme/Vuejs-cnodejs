<template>
  <div id="login">
    <div>
      <input class="token-input" type="text" placeholder="Access Token" v-model="token">
    </div> 
    <div v-if="error" class="input-error">
      {{ error }}
    </div>  
    <div>
      <a class="button" v-on:click="login">登录</a>
    </div>     
  </div>
  

</template>

<script>
import $ from 'webpack-zepto'
export default {
  name: 'login',
  data: function () {
    return {
      token: '',
      error: ''
    }
  },
  methods: {
    login () {
      if (this.token === '') {
        this.error = 'Token is error'
        return false
      }
      this.error = ''
      $.ajax({
        type: 'POST',
        url: 'https://cnodejs.org/api/v1/accesstoken',
        data: {
          accesstoken: this.token
        },
        dataType: 'json',
        success: (res) => {
          let user = {
            loginname: res.loginname,
            userId: res.id,
            token: this.token
          }
          this.$store.commit('setUser', user)
          let redirect = {name: 'Home'}
          if (this.$route.query.redirect) {
            redirect = {path: decodeURIComponent(this.$route.query.redirect)}
          }
          this.$router.push(redirect)
        },
        error: (res) => {
          var error = JSON.parse(res.responseText)
          return error
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#login {
    padding-top:60px;
    transition: all .3s ease;
    overflow-x:hidden;
    background:white;
    padding-left:15px;
    padding-right:15px;
    
}

.token-input{
    padding: 8px 0;
    border: none;
    border-bottom: 1px solid #ccd6dd;
    background-color: transparent;
    width: 100%;
    font-size: 14px;
    color: #313131;
    margin-bottom:10px;
    text-align:center;
}

.input-error{
  text-align:center;
  margin:2px 0 5px 0;
  color: #FEAE1B;
}

.button{
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    color: #fff;
    font-size: 16px;
    background-color: #31b0d5;
    border: none;
    text-align: center;
    vertical-align: middle;
}

</style>
