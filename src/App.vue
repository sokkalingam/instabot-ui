<template>
  <div id="app" class="container">
    <div class="logo row">
        <img class="logo" src="./assets/instabot-logo.png">
        <img class="logo" src="./assets/instabot-title.png">
    </div>
    <ul class="nav nav-pills nav-justified">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/createjob">Create Job</router-link></li>
      <li><router-link to="/report">View Report</router-link></li>
      <li><router-link to="/abort">Abort Job</router-link></li>
      <li><router-link to="/feedback">Feedback</router-link></li>
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
  }
  
  li > a.router-link-exact-active {
    color: #fff;
    background-color: #6b4ba0;
  }
  
  .nav>li>a:focus, .nav>li>a:hover {
    color: #fff;
    background-color: #6b4ba0;
  }
  
  .nav-pills>li>a {
    border-radius: 10px;
  }
  
  html {
    height: 100vh;
  }
  
  body {
    background-image: url('./assets/instabot-bg.jpg');
    height: 100vh;
  }
  
  .logo {
    height: 50px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

.blink {
    color: #6b4ba0 !important;
    animation: 1s blinker linear infinite;
    -webkit-animation: 1s blinker linear infinite;
    -moz-animation: 1s blinker linear infinite;
  }
  
  @-moz-keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @-webkit-keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>