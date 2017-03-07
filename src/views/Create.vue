<template>
  <div>
        <vheader ></vheader>
        <vcreate ></vcreate>
  </div>

</template>

<script>
import vheader from '../components/header.vue'
import vcreate from '../components/create.vue'
export default {
  name: 'home',
  components: {
    vheader,
    vcreate
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
