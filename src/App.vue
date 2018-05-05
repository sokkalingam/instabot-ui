<template>
  <div id="app" class="container">
    <div class="logo">
      <img class="logo" src="./assets/instabot-logo.png">
    </div>
    <ul class="nav nav-pills nav-justified">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/createjob">Create Job</router-link></li>
      <li><router-link to="/report">View Report</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  background-color: white;
  height: 100%;
}

li > a.router-link-exact-active {
  color: #fff;
  background-color: #337ab7;
}

html {
  height: 100%;
}

body {
  background-image: url('./assets/instabot-bg.jpg');
  height: 100%;
}

.logo {
  height: 200px;
}

</style>
