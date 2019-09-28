<template>
  <router-view :key='key' />

</template>
<script>
export default {
  computed: {
    key () {
      return this.$route.path + Math.random()
    }
  }
}
</script>

<style lang="less">

</style>
