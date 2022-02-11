<template>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/filtermenu">FilterMenu</router-link>
      <router-view />
  </div>
</template>

<script>
// import RandomDisplay from "@/components/RandomDosplay"
import RandomDisplay from "./components/RandomDisplay.vue"

export default {
  name: 'App',
  components: {
    RandomDisplay
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
@import url("https://fonts.googleapis.com/css2?family=Prompt&display=swap");

#app {
  font-family: 'Prompt', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #cacaca;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
}

</style>
