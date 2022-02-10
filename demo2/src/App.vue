<template>
  <div id="nav">
      <RandomDisplay />
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
  height: 100%;
}
</style>
