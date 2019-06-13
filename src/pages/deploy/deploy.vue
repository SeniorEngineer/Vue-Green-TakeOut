<!--  -->
<template>
  <div>
      <router-view/>
      <Footer/>
  </div>
</template>

<script>
import Footer from '../../components/Footer/Footer'
export default {
  data () {
    return {

    }
  },
  components: {
    Footer
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
