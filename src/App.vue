<template>
  <v-app>
    <v-main>

      <router-view></router-view>
      <preloader></preloader>

    </v-main>
  </v-app>
</template>

<script>
import Preloader from './components/Preloader'

export default {
  name: 'App',
  data: () => ({}),
  components: {
    Preloader
  },
mounted() {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
