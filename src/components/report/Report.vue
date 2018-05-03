<template>
  <div>
    <label>Instagram Username: </label>
    <input type="text" v-model="username"/>
    <button type="submit" v-on:click="search">Search</button>
    <h1>{{response}}</h1>
  </div>
</template>

<script>

export default {
  name: 'report',
  data() {
    return {
      username:'',
      response: ''
    }
  },
  methods: {
    search() {
      console.log(this.username);
      this.$http.get('http://localhost:8080/').then((response) => {
        console.log(response.bodyText);
        this.response = response.bodyText;
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}

</script>
