<template>
  <div>
        <vheader ></vheader>
        <vcontent ></vcontent>
  </div>

</template>

<script>
import vheader from '../components/header.vue'
import vcontent from '../components/content.vue'
export default {
  name: 'home',
  components: {
    vheader,
    vcontent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
