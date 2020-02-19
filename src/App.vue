<template>
  <div>
    123
    <button click='liclcik'>点我啊</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
data() {
  return {
    
  }
},
methods: {
  liclcik(){
    this.$router.push('/')
  }
},
}
</script>

<style>

</style>
