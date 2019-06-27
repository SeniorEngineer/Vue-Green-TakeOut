<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['userInfoSession'])
  },
  mounted () {
    // this.$store.dispatch('userInfoSession')
    this.userInfoSession()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
