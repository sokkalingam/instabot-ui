<template>
  <div>
    <h3>{{title}}</h3>
    <div class="alert alert-success" role="alert">
      <h4 class="blink">New Features</h4>
      <ul>
        <p><b>Email Notifications</b> - Enter your email in Create Job page and save Preset</p>
        <p><b>Feedback Page</b> - Provide feedback, report bugs, feature requests</p>
      </ul>
    </div>
    <div class="alert alert-info" role="alert">
      <h4>Let instabot like photos for you, while you are busy taking new ones</h4>
    </div>
    <div class="alert alert-warning" role="alert">
      <p>If the website is down, please try again in 30 seconds</p>
    </div>
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
