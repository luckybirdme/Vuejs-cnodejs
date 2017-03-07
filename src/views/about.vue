<template>
  <div>
        <vheader ></vheader>
        <div id="about">
        	<div class="about-title">简介</div>
        	<div class="about-detail">本项目是基于Cnodejs的api，采用vuejs前端框架，借助webpack开发的单页面web应用</div> 
          <div class="about-title">地址</div>
          <div class="about-detail"><a href="https://github.com/luckybirdme/Vuejs-cnodejs">https://github.com/luckybirdme/Vuejs-cnodejs</a></div> 
        </div>
  </div>

</template>

<script>
import vheader from '../components/header.vue'
export default {
  name: 'home',
  components: {
    vheader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#about{
	padding-top:50px;
	padding-right:10px;
	padding-left:10px;
}

.about-title{
	font-size:16px;
	font-weight:bolder;
	margin:10px auto;
}
.about-detail{
	padding-bottom: 15px;
    font-size: 14px;
    border-bottom: 1px solid #d5dbdb;
}
.about-detail a{
  color:#259;
}

</style>
