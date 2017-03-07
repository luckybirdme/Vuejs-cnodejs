<template>
  <div>
    <div class="loading-content" v-if="loading">
      <img src="../assets/images/loading.gif">
    </div>
    <div id="detail" v-if="topic.title">
      <div id="header">
        <div >
          <span id="title">{{ topic.title }}</span>
        </div>
        <div class="title-info">
          <router-link :to="{ name: 'User', params: { loginname: topic.author.loginname }}" >{{ topic.author.loginname }}</router-link> 发表于
          <span>{{ topic.create_at | getLastTime }}</span>
          <span>{{ topic.visit_count }}</span> 次浏览
          <span>{{ topic.reply_count }}</span> 个回复
        </div>
      </div>
      <div id="main" class="main-body markdown-body" v-html="topic.content">
      </div>
      <div id="comment">
        <div class="comment-header">
          回复 <span class="reply-num">{{ topic.reply_count }} 个</span>
          <span class="replay-middle"></span>
          最新 <span class="last-reply">{{ topic.last_reply_at | getLastTime }}</span>
        </div>
        <div class="comment-main">
          <ul class="comment-list">
            <li v-for="(item, key) in topic.replies">
              <div class="reply-title">
                <router-link :to="{ name: 'User', params: { loginname: item.author.loginname }}" >
                  <span class="reply-user">{{ item.author.loginname }}</span> 
                </router-link>
                发布于 <span class="reply-time">{{ item.create_at | getLastTime }}</span>
                <span class="reply-floor" v-on:click="replyOne(item.author.loginname)"><i class="fa fa-reply"></i></span>
              </div>
              <div class="markdown-body" v-html="item.content">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="reply">
        <textarea v-model="comment" v-focus="commentFocus" rows="6" placeholder="支持Markdown语法" class="text"></textarea> 
        <a class="button" v-on:click="submitComment">确定</a>
      </div>
    </div>
  </div>

  

</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'webpack-zepto'
import tool from '../lib/tool'
const markdown = require('markdown').markdown

export default {
  name: 'content',
  computed: {
    ...mapGetters({
      tab: 'getTab'
    })
  },
  data: function () {
    return {
      topic: {},
      loading: true,
      user: {},
      comment: '',
      commentFocus: false,
      replyUser: ''
    }
  },
  directives: {
    focus: {
      update: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  methods: {
    replyOne (loginname) {
      if (!this.checkLogin()) {
        return false
      }
      $(window).scrollTop($(window).scrollTop() + $(window).height() + 200)
      this.replyUser = loginname
      this.comment = ' @' + this.replyUser + ' '
      this.$nextTick(function () {
        this.commentFocus = true
      })
    },
    toHTML (comment) {
      let content = comment
      let atuser = '@' + this.replyUser
      let startMat = content.indexOf(atuser)
      if (startMat < 0) {
        return markdown.toHTML(content)
      }

      let newat = '[' + atuser + '](/#/user/' + this.replyUser + ')'
      let newcontent = content.replace(atuser, newat)
      return markdown.toHTML(newcontent)
    },
    userUrl (replies) {
      if (!replies) {
        return replies
      }
      replies.forEach(function (reply) {
        let content = reply.content
        let rtn = content.match(/@(.+?)</g)
        if (rtn) {
          rtn.forEach(function (str) {
            let loginname = str.replace('@', '')
            loginname = loginname.replace('<', '')
            let repstr = 'user/' + loginname
            let newstr = '#/user/' + loginname
            content = content.replace(repstr, newstr)
          })
          reply.content = content
        }
      })

      return replies
    },
    getOne () {
      this.loading = true
      $.get('https://cnodejs.org/api/v1/topic/' + this.$route.query.id, (d) => {
        this.loading = false
        if (d && d.data) {
          d.data.replies = this.userUrl(d.data.replies)
          this.topic = d.data
        } else {
          this.topic = {}
        }
      })
    },
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
    submitComment () {
      if (!this.checkLogin()) {
        return false
      }
      let time = new Date()
      let postData = {
        accesstoken: this.user.token,
        content: this.comment + ' --- From [LBVC](https://github.com/luckybirdme/Vuejs-cnodejs)'
      }
      let replyHtml = this.toHTML(postData.content)
      /*
      this.topic.replies.push({
        author: {
          loginname: this.user.loginname
        },
        content: replyHtml,
        create_at: time
      })
      return false
      */
      let url = 'https://cnodejs.org/api/v1/topic/' + this.topic.id + '/replies'
      $.ajax({
        type: 'POST',
        url: url,
        data: postData,
        dataType: 'json',
        success: (res) => {
          if (res.success) {
            this.topic.replies.push({
              author: {
                loginname: this.user.loginname
              },
              content: replyHtml,
              create_at: time
            })
          }
          this.comment = ''
        },
        error: (res) => {
          var error = JSON.parse(res.responseText)
          return error
        }
      })
    }
  },
  mounted: function () {
    this.getOne()
    this.user = this.$store.getters.getUser
  },
  filters: {
    getLastTime (time) {
      return tool.getLastTime(time)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import '../assets/css/github-markdown.css';

#detail {
    padding-top: 50px;
    background-color: #fff;
    transition: all .3s ease;
    overflow-x: hidden;
    padding-left:15px;
    padding-right:15px;

}
#title{
    font-size: 16px;
    font-weight: bolder;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    line-height: 130%;
    border-radius: 5px;
}
#header{
  border-bottom: 1px solid #d5dbdb;
  padding-bottom:10px;
}

.title-info{
  font-size: 12px;
  color: #838383;
  > span:before{
    content: "•";
    margin:0 3px;
  }
}
#comment{
  border-top: 1px solid #d4d4d4;
}
.comment-header{
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #d4d4d4;
    font-size:14px;
}
.reply-num {
  color:#08c;
  font-weight:bolder;
}
.last-reply{
  color:#08c;
  font-weight:bolder;
}
.replay-middle:before{
    content: "•";
    margin:0 3px;
}
.comment-list {
  margin:0 auto;
  padding:0;
}
.comment-list li{
  border-bottom: 1px solid #d4d4d4;
  display:block;
  margin:10px auto;

}
.reply-title{
  font-size:12px;
  margin-bottom:5px;
}
.reply-user{
    color: #08c;
}
.reply-time{
    color: #08c;
}
.reply-floor{
  float:right;
  color: #08c;
  margin-right: 8px;
  font-size: 14px;
}

.markdown-text {
    font-size: 18px;
}

.main-body{
  padding-top:10px;
  padding-bottom:10px;
}

.reply{
  margin-top:30px;
  padding:0 auto;
}
.reply textarea {
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
.reply .button {
    display: inline-block;
    width: 100%;
    height: 40px;
    margin: 15px 0;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    background-color: #31b0d5;
    border: none;
    text-align: center;
    vertical-align: middle;
}
.loading-content{
  margin-top:80px;
  text-align:center;
}

</style>
