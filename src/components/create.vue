<template>
  <div id="create">
    <div class="topic-tab">
      <select v-model="topic.tab" >  
        <option value="" >请选择主题</option>
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
      </select>
    </div>
    <div class="title-input">
      <input  type="text" placeholder="请填写标题" v-model="topic.title">
    </div> 
    
    <div class="topic-content">
        <textarea v-model="topic.content" rows="8" placeholder="支持Markdown语法" class="text"></textarea> 
    </div>
    <div v-if="error" class="input-error">
      {{ error }}
    </div>  
    <div>
      <a class="button" v-on:click="create">发布话题</a>
    </div>     
  </div>
  

</template>

<script>
import $ from 'webpack-zepto'
export default {
  name: 'login',
  data: function () {
    return {
      error: '',
      user: this.$store.getters.getUser,
      topic: {
        tab: '',
        title: '',
        content: ''
      }
    }
  },
  mounted: function () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      let state = true
      if (!this.user.loginname) {
        this.$router.push({
          name: 'Login',
          query: {
            redirect: encodeURIComponent(this.$route.fullPath)
          }
        })
        state = false
      }
      return state
    },
    create () {
      if (!this.checkLogin()) {
        return false
      }
      if (!this.topic.tab) {
        this.error = '请选择主题'
        return false
      }
      if (!this.topic.title) {
        this.error = '请填写标题'
        return false
      }
      if (!this.topic.content) {
        this.error = '请填写内容'
        return false
      }

      this.error = ''
      let postData = {
        ...this.topic,
        content: this.topic.content + ' --- From [LBVC](https://github.com/luckybirdme/Vuejs-cnodejs)',
        accesstoken: this.user.token
      }
      $.ajax({
        type: 'POST',
        url: 'https://cnodejs.org/api/v1/topics',
        data: postData,
        dataType: 'json',
        success: (res) => {
          if (res.success) {
            this.$router.push({
              name: 'Home'
            })
          }
        },
        error: (res) => {
          let error = JSON.parse(res.responseText)
          this.error = error.error_msg
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#create {
    padding-top:60px;
    transition: all .3s ease;
    overflow-x:hidden;
    background:white;
    padding-left:15px;
    padding-right:15px;
    
}
.topic-tab select{
  width:100%;
  height:30px;
  font-size:15px;
  border: none;
  border-bottom: 1px solid #ccd6dd;
}
.title-input{
  margin:10px 0 30px 0;
}
.title-input input{
    padding:5px 0px;
    border: none;
    border-bottom: 1px solid #ccd6dd;
    background-color: transparent;
    width: 100%;
    font-size: 14px;
    color: #313131;

}

.input-error{
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
        margin-top: 20px;
}

.topic-content textarea{
      display: block;
    border: 1px solid #d5dbdb;
    background-color: #fff;
    font-size: 14px;
    color: #313131;
    padding:5px;
    width:100%;
    box-sizing: border-box;
    resize: none;
}

</style>
