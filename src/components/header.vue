<template>
  <div>
    <div class="page-cover" v-if="show" @click="showMenu"></div>
    <div id="header" class="fix-header">
      <div class="nv-toolbar">
        
        <div v-show="!detail" v-on:click="showMenu" class="header-menu"><i class="fa fa-navicon"></i></div> 
        <div v-show="detail" v-on:click="goBack" class="go-back"><i class="fa fa-long-arrow-left"></i></a></div>

        <span class="header-title">{{ title }}</span>

        <a v-on:click="createTopic" class="toolbar-nav-right"><i class="fa fa-paper-plane"></i></a>
      </div>
    </div>

    <div id="sideBar" class="nav-list" v-bind:class="{show:show}">
      <div class="user-info" v-if="user.loginname">
            <router-link :to="{ name: 'User', params: { loginname: user.loginname }}"><i class="fa fa-user-circle-o"></i>{{ user.loginname }}</router-link>
            <a v-on:click="logout"><i class="fa fa-undo"></i> 退出 </a>
      </div>
      <div class="user-info" v-else>
            <a v-on:click="login"><i class="fa fa-user"></i>登录</a>
      </div>
      <p class="menu-line"></p>
      <div class="list-ul">
        <router-link v-for="(item, key) in this.menus" :key="key" :to="{name: 'Home', query: {tab: key}}">
          <i :class="item.icon" class="fa" ></i>{{ item.title }}</a>
        </router-link>
          
      </div>
      <p class="menu-line"></p>
      <div class="about-info">
            <a v-on:click="about"><i class="fa fa-question-circle"></i>关于</a>
      </div>
      
    </div>

  </div>
  

</template>

<script>
import common from '../lib/common'
export default {
  name: 'header',
  methods: {
    showMenu () {
      this.show = !this.show
    },
    login () {
      this.$router.push({name: 'Login'})
    },
    about () {
      this.$router.push({name: 'About'})
    },
    logout () {
      this.detail = false
      this.user = ''
      this.$store.commit('setUser', '')
      this.$router.go(0)
    },
    createTopic () {
      this.$router.push({name: 'Create'})
    },
    goBack () {
      this.$router.push({name: 'Home'})
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.query.tab) {
        this.showMenu()
        this.title = this.menus[to.query.tab].title
        this.$store.commit('setTab', to.query.tab)
      }
      console.log('to')
      console.log(to)
    }
  },
  data: function () {
    return {
      show: false,
      menus: {},
      title: '',
      user: {},
      detail: false
    }
  },
  mounted: function () {
    this.menus = common.common.menus
    this.title = this.menus[this.$store.getters.getTab].title
    if (this.$route.name === 'About') {
      this.title = '关于'
    } else if (this.$route.name === 'Login') {
      this.title = '登录'
    } else if (this.$route.name === 'Topic') {
      this.detail = true
    } else if (this.$route.name === 'User') {
      this.title = '用户'
    }
    this.user = this.$store.getters.getUser
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import '../assets/css/font-awesome.min.css';


#header {
  border-bottom: 1px solid #e8e8e8;
  &.fix-header {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    position: fixed;
    top: 0;
    left: 0;
    transition: all .3s ease;
    box-shadow: 0 0 4px rgba(0,0,0,0.25);
    z-index: 6;
  }
  &.show {
    transform: translateX(200px);
  }
}
.nv-toolbar {
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    &>span {
      display: block;
      text-align: center;
      height: 100%;
      line-height: 44px;
      font-size: 16px;
      width: 100%;
      position: relative;
      z-index: 0;
    }
    .toolbar-nav {
      width: 49px;
      height: 44px;
      position: absolute;
      background: url("../assets/images/menu_icon.png") no-repeat center center;
      background-size: 24px;
      margin: 0;
      z-index: 1;
      top: 0;
      left: 0;
    }
}

.page-cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 7;
}

.nav-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -200px;
    width: 200px;
    background-color: white;
    transition: all .3s ease;
    z-index: 99;
    &.show {
        transform: translateX(200px);
    }
    &>a{
      font-size:16px;
    }
}    
.list-ul {
    margin: 0 24px;
    overflow: hidden;
    line-height: 15px;
    font-weight: bold;
    .fa{
      margin-right:20px;
    }
    >a{
      color: #259;
      display: block;
      margin:10px 0 20px 0;
    }
}
.menu-line{
  margin:0 8px 10px 8px;
  border-bottom: 2px solid #d4d4d4;
}
.user-info{
  margin:10px 25px;
  font-weight: bold;
  .fa{
    margin-right:20px;
  }
  >a{
      color: #259;
      display: block;
  }
}

.about-info{
  margin:12.5px 25px;
  font-weight: bold;
  .fa{
    margin-right:20px;
  }
  >a{
      color: #259;
      display: block;
  }
}

.user-info a{
  margin:13px auto;
}
.toolbar-nav-right{
      position: absolute;
    padding: 10px 20px;
    right:0;
    color: #31b0d5;
}
.nv-toolbar .go-back{
    position: absolute;
    margin: 0;
    z-index: 1;
    left: 0;
    color: #31b0d5;
    padding: 10px 16px;
    &>i{
      font-size: 22px;
    }
}

.header-menu{
    position: absolute;
    margin: 0;
    z-index: 1;
    top: 0;
    left: 0;
    color: #31b0d5;
    padding: 12px 18px;
    &>i{
      font-size: 20px;
    }
}
.header-title{
  color: #259;
  font-weight:bold;
}

</style>
