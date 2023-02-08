<template>
  <div id="app">
    <!-- <Home /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    // Home
  }
}
</script>

<style lang="scss">
@import url(./assets/css/reset.css);

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
