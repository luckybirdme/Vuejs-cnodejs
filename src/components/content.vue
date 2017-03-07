<template>
  <div id="content">
    <ul class="posts-list">

      <li v-for="item in topics">
        <div class="summary ">
              <div class="details">
                  <div>
                    <span v-if="item.top" class="top-topic">置顶</span>
                    <span v-else-if="item.good" class="top-topic" >精华</span>
                    <span v-else-if="menus[item.tab]" class="top-topic not-top" >{{ menus[item.tab].title }}</span>
                    <h2>
                      <a v-on:click="getDetail(item.id)">
                        {{ item.title }}
                      </a>
                    </h2>
                  </div>
                  
                  <div class="tags">
                    <span>
                      <i class="fa fa-comments-o"></i> {{ item.reply_count }}
                    </span>
                    <span>
                      <i class="fa fa-eye"></i> {{ item.visit_count }}
                    </span>
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
    <div class="loading-content" v-if="loading">
      <img src="../assets/images/loading.gif">
    </div>
              
  </div>
  

</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'webpack-zepto'
import tool from '../lib/tool'
import common from '../lib/common'
export default {
  name: 'content',
  computed: {
    ...mapGetters({
      tab: 'getTab'
    })
  },
  data: function () {
    return {
      scroll: true,
      topics: [],
      search: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
      menus: common.common.menus,
      loading: true
    }
  },
  watch: {
    tab: function (to, from) {
      this.search.tab = to
      this.search.page = 1
      this.topics = []
      this.getTopic()
    }
  },
  methods: {
    getTopic () {
      this.loading = true
      let params = $.param(this.search)
      $.get('https://cnodejs.org/api/v1/topics?' + params, (d) => {
        this.scroll = true
        this.loading = false
        if (d && d.data) {
          this.topics.push.apply(this.topics, d.data)
        }
      })
    },
    getScrollData () {
      if (this.scroll) {
        let totalheight = parseInt($(window).height()) + parseInt($(window).scrollTop())
        let documentheight = $(document).height()
        if (documentheight <= totalheight + 200) {
          this.scroll = false
          this.search.page += 1
          this.getTopic()
        }
      }
    },
    getDetail (id) {
      $(window).off('scroll')
      window.sessionStorage.scrollTop = $(window).scrollTop()
      window.sessionStorage.topics = JSON.stringify(this.topics)
      window.sessionStorage.search = JSON.stringify(this.search)

      this.$router.push({
        name: 'Topic',
        query: {
          id: id
        }
      })
    }
  },
  filters: {
    getLastTime (time) {
      return tool.getLastTime(time)
    }
  },
  mounted: function () {
    let topics = ''
    if (window.sessionStorage.topics) {
      topics = JSON.parse(window.sessionStorage.topics)
    }
    let search = ''
    if (window.sessionStorage.search) {
      search = JSON.parse(window.sessionStorage.search)
    }
    let scrollTop = 0
    if (window.sessionStorage.scrollTop) {
      scrollTop = window.sessionStorage.scrollTop
    }
    if (topics && search && search.tab === this.search.tab) {
      this.topics = topics
      this.search = search
      this.$nextTick(() => $(window).scrollTop(scrollTop))
    } else {
      this.getTopic()
    }

    window.sessionStorage.search = ''
    $(window).on('scroll', tool.throttle(this.getScrollData, 300, 1000))
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.summary {
    overflow: hidden;
    background-color: #FFF;
}


.votes div {
    display: inline-block;
}
.vote-block{
}
.answer-block{
  padding-top:7px;
  border-top: 1px solid #d4d4d4;
}
.votes .mini-counts {
    font-size: 14px;
    display: inline-block;
    float: left;
    text-align: right;
    text-align:center;
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

.tags span{
  margin-right:3px;
}

.count-comments{
  color:#698ebf;
  font-weight: bold;
}
.count-read{
  color: #77808F;
}


#content {
    padding-top:44px;
    transition: all .3s ease;
    overflow-x:hidden;
    background:white;
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

.top-topic{
  display: inline-block;
  font-size:12px;
  padding:1px 5px;background:#80bd01;color:white;border-radius: 4px;
  height:20px; line-height:20px; float:left;
}
.not-top{
  background-color: #e5e5e5;
    color: #999;
}
.loading-content{
  margin:30px auto;
  text-align:center;
}

</style>
