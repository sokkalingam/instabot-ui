<template>
  <div>

    <div class="row">
      <div class="form-group form-inline col-md-12">
        <label for="username">Instagram Username:</label>
        <input type="text" v-model="username" class="form-control" id="userName">
        <button type="button" v-on:click="search" class="btn btn-info">Get Report</button>
      </div>
    </div>

    <div class="row">

      <table class="table table-striped table-bordered" v-if="searchResponseText">
        <tbody>
          <tr>
              <th data-field="startTime" class="key">Start Time</th>
              <td data-field="startTime">{{formatDate(report.startTime)}}</td>
          </tr>
          <tr>
              <th data-field="currentLoop" class="key">Current Loop</th>
              <td data-field="currentLoop">{{report.currentLoop}}</td>
          </tr>
          <tr>
              <th data-field="photosLiked" class="key">Photos Liked</th>
              <td data-field="photosLiked">{{report.photosLiked}}</td>
          </tr>
          <tr>
              <th data-field="currentHashtag" class="key">Current Hashtag</th>
              <td data-field="currentHashtag">{{report.currentHashtag}}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="showNoResponse">
        <h4>No job is currently running for {{this.username}}</h4>
      </div>

    </div>

    <spinner v-bind:showSpinner="showSpinner"></spinner>

  </div>
</template>

<script>

import { ConfigConstants } from '../../models/ConfigConstants'
import dateFormat from 'dateformat'

export default {
  name: 'report',
  data() {
    return {
      username:'',
      searchResponseText: '',
      showNoResponse: false,
      showSpinner: false,
      report: {
        startTime: '',
        currentLoop: '',
        photosLiked: '',
        photosCommented: '',
        currentHashtag: ''
      }
    }
  },
  methods: {
    search() {
      console.log(this.username);
      this.showSpinner = true;
      this.$http.get(`${ConfigConstants.SERVER_BASE_URL}/reports/${this.username}`)
        .then((response) => {
          this.showSpinner = false;
          console.log("search", response);
          if (response.bodyText) {
            this.searchResponseText = response.bodyText;
            this.report = JSON.parse(response.bodyText);
            this.showNoResponse = false;
          } else {
            this.showNoResponse = true;
          }
        }).catch((error) => {
          this.showSpinner = false;
          console.log(error);
        });
    },
    formatDate(dateString) {
      console.log(dateString);
      if (dateString) {
        let date = new Date(dateString);
        return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      }
      return '';
    }
  }
}

</script>

<style scoped>


</style>
