<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
a {
    text-decoration: none;
}
body{
  margin:0;
  font-family: Helvetica Neue,Helvetica,Segoe UI,Arial,freesans,sans-serif;
}

div{
  magin:0;
}
img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
}

</style>
