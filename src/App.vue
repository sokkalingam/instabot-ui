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
    <div class="notification alert alert-info alert-dismissible" role="alert" v-if="notification">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>{{notification.title}}</strong>
      <p>{{notification.message}}</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { ConfigConstants } from './models/ConfigConstants';

export default {
  name: 'App',
  data() {
    return {
      notification: null
    }
  },
  created: function() {
    this.lookupNotification();
  },
  methods: {
    lookupNotification() {
      this.$http.get(`${ConfigConstants.SERVER_BASE_URL}/notification/`)
        .then((response) => {
          this.showSpinner = false;
          console.log(response);
          this.notification = response.body;
        }).catch((error) => {
          this.showSpinner = false;
          console.log(error);
        });
    }
  }
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

.notification {
  margin-top: 10px;
}

.blink {

    animation:1.5s blinker linear infinite;
    -webkit-animation:1.5s blinker linear infinite;
    -moz-animation:1.5s blinker linear infinite;
     color: #7100a5 !important;
    }

    @-moz-keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }

    @-webkit-keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }

    @keyframes blinker {  
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }

</style>