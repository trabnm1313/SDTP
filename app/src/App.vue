<template>
  <div id="nav">
      <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
<style>

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
