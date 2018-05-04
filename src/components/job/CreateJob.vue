<template>

  <form id="createJobForm">
    <div class="form-group">
      <label for="username">Instagram Username:</label>
      <input type="text" v-model="formData.username" class="form-control" id="username">
    </div>
    <div class="form-group">
      <label for="sessionId">Session Id:</label>
      <textarea type="text" v-model="formData.sessionId" class="form-control" id="sessionId"></textarea>
    </div>
    <div class="form-group">
      <label for="noOfPhotos">Number of Photos:</label>
      <input type="number" v-model="formData.noOfPhotos" class="form-control" id="noOfPhotos">
    </div>
    <div class="form-group">
      <label for="noOfTimesToLoop">Loop Count:</label>
      <input type="number" v-model="formData.noOfTimesToLoop" class="form-control" id="noOfTimesToLoop">
    </div>
    <div class="form-group">
      <label for="timeMin">Minimum Wait Time:</label>
      <input type="number" v-model="formData.timeMin" class="form-control" id="timeMin">
    </div>
    <div class="form-group">
      <label for="timeMax">Maximum Wait Time:</label>
      <input type="number" v-model="formData.timeMax" class="form-control" id="timeMax">
    </div>
    <div class="form-group">
      <label for="maxNoOfFollowers">Maximum Followers:</label>
      <input type="number" v-model="formData.maxNoOfFollowers" class="form-control" id="maxNoOfFollowers">
    </div>
    <div class="form-group">
      <label for="hashtags">Hashtags (comma separated):</label>
      <textarea type="text" v-model="formData.hashtagText" class="form-control" id="hashtags"></textarea>
    </div>
    <button type="button" v-on:click="submitForm" class="btn btn-primary btn-lg">Submit</button>
  </form>

</template>

<script>
import { ConfigConstants } from '../../models/ConfigConstants';

export default {
  name: 'create-job',
  data() {
    return {
      formData: {
        username: '',
        sessionId: '',
        noOfPhotos: 5,
        noOfTimesToLoop: 10,
        timeMin: 25,
        timeMax: 30,
        maxNoOfFollowers: 500,
        hashtagText: '',
        hashtags: []
      }
    }
  },
  methods: {
    processHashtags() {
        this.formData.hashtags = this.formData.hashtagText.split(",");
    },
    submitForm() {
      this.processHashtags();
      console.log(this.formData);
      this.$http.post(`${ConfigConstants.SERVER_BASE_URL}/hashtag/looplike`, this.formData)
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
    }
  }
}

</script>

<style>

  form {
    text-align: left;
    padding: 50px;
  }

</style>
