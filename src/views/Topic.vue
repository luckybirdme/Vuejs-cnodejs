<template>
  <div>
        <vheader ></vheader>
        <vdetail ></vdetail>
  </div>

</template>

<script>
import vheader from '../components/header.vue'
import vdetail from '../components/detail.vue'
export default {
  name: 'home',
  components: {
    vheader,
    vdetail
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
