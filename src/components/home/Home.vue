<template>
  <div>
    <h3>{{title}}</h3>
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
  name: 'home',
  data() {
    return {
      title: 'Welcome to InstaBot!'
    }
  }
}

</script>
