<template>
  <div>
        <vheader ></vheader>
        <vlogin ></vlogin>
  </div>

</template>

<script>
import vheader from '../components/header.vue'
import vlogin from '../components/login.vue'
export default {
  name: 'home',
  components: {
    vheader,
    vlogin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
