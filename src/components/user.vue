<template>
  <div id="user">
    <div class="user-header">
      <img class="user-img" :src="this.user.avatar_url">
      <div class="user-name">{{ this.user.loginname }}</div> 
      <div class="user-bottom">
        <span>注册:</span>
        <span class="user-time">{{ this.user.create_at | getLastTime }}</span> 
        <span>积分:</span>
        <span class="user-score">{{ this.user.score }}</span>
      </div>
    </div>
    <div class="user-topic-reply">
      <ul class="user-tabs">
        <li class="item" v-on:click="checkTopic" :class="{ selected : isTopic}">最新发布</li> 
        <li class="item" v-on:click="checkTopic" :class="{ selected : !isTopic}">最近回复</li>
      </ul>
    </div>
    <div class="topic-list">
      <ul class="posts-list" v-show="isTopic">
          <li v-for="item in this.user.recent_topics">
            <div class="summary ">
                  <div class="details">
                      <div>
                        <h2>
                          <a v-on:click="getDetail(item.id)">
                            {{ item.title }}
                          </a>
                        </h2>
                      </div>
                      <div class="tags">
                        <span>
                          <i class="fa fa-clock-o"></i> {{ item.last_reply_at | getLastTime }}
                        </span>
                        <span>
                          <i class="fa fa-user-circle-o"></i> {{ item.author.loginname }}
                        </span>
                      </div><!-- / tags -->
      
                </div><!-- / details -->
            </div>
          </li>
      </ul>
    </div>
    <div class="reply-list" v-show="!isTopic">
      <ul class="posts-list">
          <li v-for="item in this.user.recent_replies">
            <div class="summary ">
                  <div class="details">
                      <div>
                        <h2>
                          <a v-on:click="getDetail(item.id)">
                            {{ item.title }}
                          </a>
                        </h2>
                      </div>
                      <div class="tags">
                        <span>
                          <i class="fa fa-clock-o"></i> {{ item.last_reply_at | getLastTime }}
                        </span>
                        <span>
                          <i class="fa fa-user-circle-o"></i> {{ item.author.loginname }}
                        </span>
                      </div><!-- / tags -->
      
                </div><!-- / details -->
            </div>
          </li>
      </ul>
    </div>
  </div>
  

</template>

<script>
import $ from 'webpack-zepto'
import tool from '../lib/tool'
export default {
  name: 'login',
  data: function () {
    return {
      loginname: '',
      user: '',
      isTopic: true
    }
  },
  filters: {
    getLastTime (time) {
      return tool.getLastTime(time, true)
    }
  },
  mounted: function () {
    this.loginname = this.$route.params.loginname
    this.getUser()
  },
  methods: {
    getUser () {
      let loginname = this.loginname
      $.get('https://cnodejs.org/api/v1/user/' + loginname, (d) => {
        if (d && d.data) {
          let data = d.data
          this.user = data
        }
      })
    },
    getDetail (id) {
      this.$router.push({
        name: 'Topic',
        query: {
          id: id
        }
      })
    },
    checkTopic () {
      this.isTopic = !this.isTopic
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#user {
    padding-top:45px;
    transition: all .3s ease;
    overflow-x:hidden;
    background:white;   
}
.user-header{
    width: 100%;
    background-color: #d3eeff;
    text-align: center;
    height: 130px;
}
.user-img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: 15px;
  display: inline-block;
}
.user-name{
  text-align:center;
  font-size:12px;
  color: #626262;
}
.user-time{
  margin-right:20px;
}

.user-bottom{
  margin:5px 0 10px 0;
  padding: 0 10px;
  font-size: 12px;
  color: #626262;
}
.posts-list {
    background-color: white;
    padding:0;
    margin:0;
    li {
        border-bottom: 1px solid #d5dbdb;
        padding:15px;
    }
   
}
.summary .details {
    width: 85%;
    width: calc(100% - 0px);
    align-self: center;
    box-sizing: border-box;
}

.summary .details h2{
    font-weight: bloder;
    font-size: 16px;
    margin-top:0px;
    word-break: break-word;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #3e82c1;
    margin-bottom:5px;
}
.summary .details a {
    color: #259;
    margin-left:5px;
}

.summary .tags {
    margin-left:2px;
    margin-top:7px;
    color:#657786;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
}

.user-tabs {
    width: 100%;
    height: 41px;
    list-style: none;
    position: relative;
    padding:0;
    margin:0 0 5px 0;
}
.user-tabs .item {
    width: 50%;
    padding: 10px 0;
    float: left;
    font-size: 12px;
    text-align: center;
    font-weight: 700;
    color:#626262;
    border-bottom: 1px solid #d4d4d4;
    border-top: 1px solid #d4d4d4;
}
.user-tabs .selected {
    color: #ff5a5f;
    border-bottom: 2px solid #ff5a5f;
}
</style>
