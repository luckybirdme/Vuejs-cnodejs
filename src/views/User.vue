<template>
  <div>
        <vheader ></vheader>
        <vuser ></vuser>
  </div>

</template>

<script>
import vheader from '../components/header.vue'
import vuser from '../components/user.vue'
export default {
  name: 'home',
  components: {
    vheader,
    vuser
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
