<template>
  <div>
    <h3>{{title}}</h3>
    <div class="alert alert-success" role="alert">
      <h4 class="blink">New URLs</h4>
      <h5>If you are not able to access instabot, try one of the following URLs</h5>
      <ul>
        <p><a href="http://instabot.localtunnel.me">http://instabot.localtunnel.me</a></p>
        <p><a href="http://instabot1.localtunnel.me">http://instabot1.localtunnel.me</a></p>
        <p><a href="http://instabot2.localtunnel.me">http://instabot2.localtunnel.me</a></p>
      </ul>
    </div>
    <div class="alert alert-info" role="alert">
      <h4>Let instabot like photos for you, while you are busy taking new ones</h4>
    </div>
    <!-- <div class="alert alert-warning" role="alert">
      <p>If the website is down, please try again in 30 seconds</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "Welcome to InstaBot!"
    };
  }
};
</script>
